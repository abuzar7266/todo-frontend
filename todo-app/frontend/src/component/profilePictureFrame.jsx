import React from 'react';
import {Col, Row} from 'react-bootstrap';
import '../asset/css/item.css';
import Profile_Pic from '../asset/img/profile-pic.jpg';
const ProfilePictureFrame = () =>{
    return (<> 
    <Row>
        <Col md={5} sm={5}></Col>
        <Col md={1} sm={3}>
            <img src={Profile_Pic} className='profile-pic' alt="Profile Picture" fluid height="100"/>
        </Col>
    </Row>
    </>)
}
export default ProfilePictureFrame;