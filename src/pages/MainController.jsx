import React, { useState } from 'react';

import CompletionGenerator from './CompletionGenerator';
import Itinerary from './Itinerary';

const MainController = () => {

	const [response, setResponse] = useState('');
	const [accomodationsResponse, setAccomodationsResponse] = useState('');
	const [transporationResponse, setTransporationResponse] = useState('');

	return (
		<div>
			<div className="main-controller">
				<h2 className="font-size-32px color-black text-center"><b>Your AI-Powered Vacation Planner</b></h2>
				<h3 className="text-center">Discover, Plan, and Experience Your Dream Getaway with Intelligent Assistance</h3>
				<CompletionGenerator
					setResponse={setResponse}
					setAccomodationsResponse={setAccomodationsResponse}
					setTransporationResponse={setTransporationResponse}
				/>
			</div>
			<Itinerary
				response={response}
				accomodationsResponse={accomodationsResponse}
				transporationResponse={transporationResponse}
			/>
		</div>
	);

}

export default MainController;