import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from "react-markdown";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { getDailyItinerary, generateAccomodationsSummary, getTransportationSummary } from '../api/generate';

const CompletionGenerator = () => {
	const [response, setResponse] = useState('');
	const [accomodationsResponse, setAccomodationsResponse] = useState('');
	const [transporationResponse, setTransporationResponse] = useState('');

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [destination, setDestination] = useState('');
	const [additionalNotes, setAdditionalNotes] = useState('');

	const LOADING_MSG = "Loading...";
	const ERROR_MSG = "Error: There was a problem generating your travel plans. Please try again.";

	var initialStartDate = new Date();
	initialStartDate.setDate(initialStartDate.getDate() + 1);
	var initialEndDate = new Date(initialStartDate);
	initialEndDate.setDate(initialStartDate.getDate() + 3);

	useEffect(() => {

		if (startDate === '' || endDate === '') {
			setStartDate(initialStartDate.toISOString().slice(0, 10));
			setEndDate(initialEndDate.toISOString().slice(0, 10));
		}

	}, [startDate, endDate]);

	const completePrompt = async () => {

		setResponse(LOADING_MSG);
		setAccomodationsResponse(LOADING_MSG);
		setTransporationResponse(LOADING_MSG);

		
		// Start all three async operations concurrently
		const dailyItineraryPromise = getDailyItinerary(startDate, endDate, destination, additionalNotes);
		const accomodationsSummaryPromise = generateAccomodationsSummary(destination);
		const transportationSummaryPromise = getTransportationSummary(destination);

		// Wait for all promises to resolve
		const [dailyItinerary, accomodationsSummary, transportationSummary] = await Promise.all([
			dailyItineraryPromise,
			accomodationsSummaryPromise,
			transportationSummaryPromise
		]);

		setResponse(dailyItinerary ? dailyItinerary : ERROR_MSG);
		setAccomodationsResponse(accomodationsSummary ? accomodationsSummary : ERROR_MSG);
		setTransporationResponse(transportationSummary ? transportationSummary : ERROR_MSG);
	};

	const loadingSpinner = () => {
		return (
			<div className="div-spinner">
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
		);
	};


	return (
		<div className="prompt-card">
			<div className="prompt-card-contents">
				<Form className="form">
					<Row>
						<h2>When do you plan on travelling?</h2>
						<Col>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Start Date</Form.Label>
								<Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>End Date</Form.Label>
								<Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<h2>Where are you planning to go?</h2>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Control type="text" value={destination} placeholder="Ex. New York City, Miami, Paris..." onChange={e => setDestination(e.target.value)} />
						</Form.Group>
					</Row>

					<Row>
						<h2>Is there anything we should consider when making travel plans for you?</h2>
						<p>Include anything you would like us to factor in on your trip.</p>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Control
								as="textarea" rows={5} value={additionalNotes} placeholder="Ex. I want to see live music. I would like to do a lot of hiking. I am vegan so please only suggest vegan options. Etc." onChange={e => setAdditionalNotes(e.target.value)}
							/>
						</Form.Group>
					</Row>
				</Form>

				<div className="d-grid gap-2">
					<Button variant="primary" size="lg" onClick={completePrompt}>Plan your trip</Button>
				</div>

				<div>
					<div>
						{response && 
						<div>
							<h2>Daily Itinerary</h2>
							<ReactMarkdown>
								{response}
							</ReactMarkdown>
						</div>}
						{transporationResponse && 
						<div>
							<h2>Transporation</h2>
							<ReactMarkdown>
								{transporationResponse}
							</ReactMarkdown>
						</div>}
						{accomodationsResponse && 
						<div>
							<h2>Accomodations</h2>
							<ReactMarkdown>
								{accomodationsResponse}
							</ReactMarkdown>
						</div>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompletionGenerator;
