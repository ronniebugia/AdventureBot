import React from "react"

import Spinner from 'react-bootstrap/Spinner';
import ReactMarkdown from "react-markdown";

const Itinerary = ({ response, transporationResponse, accomodationsResponse }) => {

	return (
		<div>
			{response === 'Loading...' ?
				<Spinner />
				: response !== '' ?
					<div className="itinerary-section">
						<h2>Daily Itinerary</h2>
						<ReactMarkdown>
							{response}
						</ReactMarkdown>
					</div>
					: null}
			{transporationResponse === 'Loading...' ?
				<Spinner />
				: response !== '' ?
					<div className="itinerary-section">
						<h2>Transporation</h2>
						<ReactMarkdown>
							{transporationResponse}
						</ReactMarkdown>
					</div>
					: null}
			{accomodationsResponse === 'Loading...' ?
				<Spinner />
				: response !== '' ?
					<div className="itinerary-section">
						<h2>Accomodations</h2>
						<ReactMarkdown>
							{accomodationsResponse}
						</ReactMarkdown>
					</div>
					: null}
		</div>
	)
}

export default Itinerary;