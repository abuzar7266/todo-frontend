import React from 'react';
import '../asset/css/home.css';
import { Row, Col } from 'react-bootstrap';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Navigation = ({start, task, handlePrev, handleNext}) =>{
    return (<>
        <Row style={{marginTop:'1vh'}}>
            <Col md={4} sm={6}></Col>
            <Col md={2}>
                { start>=8 && <div className='list-arrowbackward' onClick={handlePrev}><ArrowBackIcon/></div>}
            </Col>
            <Col md={2}>
                { start+9<task.length && <div className='list-arrowforward' onClick={handleNext}><ArrowForwardIcon/></div>}
            </Col>
            <Col md={4}></Col>
        </Row>
    </>)
}
export default Navigation;