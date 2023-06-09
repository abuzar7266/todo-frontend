import React from 'react';
import '../asset/css/home.css';
import { Row, Col} from 'react-bootstrap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Dropdown from 'react-bootstrap/Dropdown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MainDropDown = ({handleOpenModal, handleClearAll, handleToggle, setIsOpen, show, setShow, isOpen}) =>{
    return (<>
    <Row style={{marginTop:'3vh'}}>
    <Col md={4} sm={3}></Col>
    <Col>
        <div className="button-theme">
            <div className='list-slide'>
                <div className='list-bar' onClick={handleToggle}>
                    <MenuIcon/>
                </div>
                <div>
                    {
                        isOpen && 
                        (<Dropdown.Menu
                            className='list-option'
                            show={isOpen}
                            >
                            <Dropdown.Item onClick={handleOpenModal}><AddCircleIcon/> Add Task</Dropdown.Item>
                            <Dropdown.Item onClick={handleClearAll}><DeleteIcon/> Clear All</Dropdown.Item>
                        </Dropdown.Menu>)
                    }
                </div>
            </div>
            <div style={{marginLeft:'40px'}} onClick={()=>{setIsOpen(false)}}>To do today</div>
            <div className='list-expandIcon' onClick={()=>{setShow(!show);setIsOpen(false);}}>
                { show===false && <ExpandMoreIcon/>}
                { show===true && <ExpandLessIcon/>} 
            </div>
        </div>
    </Col>
    </Row></>)
}

export default MainDropDown;