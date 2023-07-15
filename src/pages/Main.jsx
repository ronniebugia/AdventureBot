import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MainController from './pages/MainController';

const Main = () => {
    
    return (
        <div>
            <Row>
               <MainController />
            </Row>
        </div>
    )
}

export default Main;