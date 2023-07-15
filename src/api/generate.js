import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getDailyItinerary = async (startDate, endDate, destination, additionalNotes) => {

	const prompt = generateDailyItineraryPrompt(startDate, endDate, destination, additionalNotes);
	console.log(prompt);
	return await generateCompletion(prompt);
}

export const generateAccomodationsSummary = async (dailyItinerary, destination) => {
	const prompt = generateAccomodationsPrompt(dailyItinerary, destination);
	console.log(prompt);
	return await generateCompletion(prompt);
}

export const getTransportationSummary = async (destination) => {
	const prompt = generateTransportationPrompt(destination);
	console.log(prompt);
	return await generateCompletion(prompt);
}

const generateCompletion = async (prompt) => {

	const temperature = 0.8;
	const max_tokens = 2000;

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: temperature,
			max_tokens: max_tokens,
		});
		console.log(response.data.choices[0].text);
		return response.data.choices[0].text;
	} catch (error) {
		console.error(error);
		return false;
	}
}


const generateDailyItineraryPrompt = (startDate, endDate, destination, additionalNotes) => {
	var prompt = `
Give me a detailed daily itinerary for things to do in ${destination}. Write this response in Markdown Language.
Start Date:  ${startDate}
End Date: ${endDate}
Keep the plan for each day under 200 words. Give the information in a short bulleted list.
Make the title for each day look like "**Day N: Month Day, Year - Quick Summary of places visited on that day**".
Each item in the list should look like "**Place to visit**: Summary of what to do there".
`
	if (additionalNotes) {
		prompt = prompt + `	Please include in your response these additional notes for the trip: ${additionalNotes}.`;
	}
	return prompt;
}

const generateAccomodationsPrompt = (destination) => {
	const prompt = `Give me a list of accommodation options in ${destination}, including price range, address, and a brief description for each option. Write response in Markdown and make titles bold.`;
	return prompt;
}

const generateTransportationPrompt = (destination) => {
	const prompt = `For my trip to ${destination}. Give me a list of options for transporations with price range and brief description. Write the response in Markdown and make titles bold.`
	return prompt;
}