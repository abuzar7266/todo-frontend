import React, { useEffect, useState } from 'react';
import '../asset/css/home.css';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dropdown from 'react-bootstrap/Dropdown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Profile_Pic from '../asset/img/profile-pic.jpg';
import Item from '../component/Item';
import config from '../config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
const Home = () =>{
    const [detailModel, setDetailModel] = useState(false);
    const [task,setTask] = useState([]);
    const [itemOpt, setItemOpt] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [newtask,setNewTask] = useState("");
    const [toggleIdx,setToggleIdx] = useState(0);
    const [listUpdate,setListUpdate] = useState(1);
    const [selectedItem,setSelectedItem] = useState(null);
    useEffect(()=>{
        if(listUpdate===1){
            axios.get(`${config.serviceUrl}`,{}).then((data)=>{   
                console.log("Updated");
                setTask(data.data.tasks);
                setListUpdate(0);
            })
        }
    },[listUpdate,setListUpdate])
    const handleOpenModal = () => {
        setItemOpt(false);
        setIsOpen(false);
        setNewTask("");
        setShowModal(true);
    };
    const handleItemToggle = (idx)=>{
        setIsOpen(false);
        if(itemOpt){
            setToggleIdx(-1);
        }
        else
        {
            setToggleIdx(idx);
        }
        setItemOpt(!itemOpt);
    }
    const handleCloseModal = () => {
        setItemOpt(false);
        setIsOpen(false);
        setNewTask("");
        setShowModal(false);
    };

    const handleToggle = () => {
        setItemOpt(false);
        setIsOpen(!isOpen);
    };
    const [start, setStart] = useState(0);
    const handleNext = () =>{
        if(start+9<task.length){
            setStart(start+9);
        }
    }
    const handleAdd = ()=>{
        axios.post(`${config.serviceUrl}`,{task:newtask})
        .then((x)=>{
            console.log(x);
            if(x.data.status===false){
               // toast('Failed to add item');
               toast.error('Error! Failed to add item', {
                position: toast.POSITION.TOP_RIGHT
               });
            }else{
                toast.success('New item added!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setListUpdate(1);
        })
    }
    const handlePrev = () =>{
        if(start-9<0){
            setStart(0);
        }else{
            setStart(start-9);
        }
    }
    const onKeyHandler = (e)=>{
        if(e.key==='Enter'){
            handleAdd();
            setShowModal(false);
        }
    }
    const handleDeleteOne = (_id)=>{
        axios.delete(`${config.serviceUrl}${_id}`,{}).then((res)=>{
            console.log(res);
            if(res.data.status===true){
                toast.success('Successfully deleted the item', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
                toast.error('Error! Item does not exist', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setListUpdate(1);
            setItemOpt(false);
        })
    }
    const handleClearAll = ()=>{
        axios.delete(`${config.serviceUrl}`,{}).then((res)=>{
            if(res.data.status===true){
                toast.success('Cleared the item list', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
                toast.warning('Warning! List is already empty', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setListUpdate(1);
            setIsOpen(false);
        })
    }
    const handleUpdate = (t,c, _id)=>{
        axios.put(`${config.serviceUrl}${_id}`,{
            task:t,
            completed:c
        }).then((res)=>{
            if(res.data.status===true){
                setListUpdate(1);
                toast.success('Item marked as done', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }else{
                toast.warning('Warning! Completed tasks can not be undone!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        })
    }
    return (<>
    <Container className='container-theme' fluid>
        <ToastContainer/>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add TODO Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input className="add-item-modal" type="text" name="task" placeholder="Write Task" onChange={(e)=>{setNewTask(e.target.value)}} onKeyPress={onKeyHandler}/>
            </Modal.Body>
        </Modal>
        <Modal show={detailModel} onHide={()=>{setDetailModel(!detailModel)}}>
            <Modal.Header closeButton>
                <Modal.Title>Item Detail</Modal.Title>
            </Modal.Header>
            {
                selectedItem!=null && 
                (<Modal.Body>
                    <h6>Item#: {selectedItem._id}</h6> <br />
                    <h6>TO DO: {selectedItem.task}</h6> <br />
                    <h6>{selectedItem.completed===true && <div>STATUS: COMPLETED</div>}{selectedItem.completed===false && <div>STATUS: NOT COMPLETED</div>}</h6> <br />
                    <h6>CREATED ON : {(Date(selectedItem.creation_time))}</h6> 
                </Modal.Body>)
            }
        </Modal>
        <br />
        <Row>
            <Col md={5}></Col>
            <Col md={1}>
                <img src={Profile_Pic} className='profile-pic' alt="Profile Picture" fluid height="120"/>
            </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
            <Col md={4}></Col>
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
        </Row>
            { 
                show===true && 
                <div style={{zIndex:'0'}}>
                {
                    task.map((data, idx)=>{
                        var theme = "none";
                        if(idx-start<9 && idx-start>=0)
                        {
                            if(idx-start===0){
                                    theme = "top-item-theme"
                                }
                                else{
                                    if(idx-start===8){
                                        theme = "bottom-item-theme"
                                    }else if(idx-start>0){
                                        theme = "mid-item-theme"
                                    }
                                }
                            return (
                                <>
                                <Item data={data} handleUpdate={handleUpdate} idx={idx} handleItemToggle={handleItemToggle} handleDeleteOne={handleDeleteOne} detailModel={detailModel} setDetailModel={setDetailModel} setSelectedItem={setSelectedItem} setItemOpt={setItemOpt} itemOpt={itemOpt} toggleIdx={toggleIdx} theme={theme}/>
                                </>
                            )
                        }
                    })
                }
                <Row style={{marginTop:'1vh'}}>
                    <Col md={4}></Col>
                    <Col md={2}>
                        { start>=8 && <div className='list-arrowbackward' onClick={handlePrev}><ArrowBackIcon/></div>}
                    </Col>
                    <Col md={2}>
                        { start+9<task.length && <div className='list-arrowforward' onClick={handleNext}><ArrowForwardIcon/></div>}
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </div>}
        </Container></>);
}
export default Home;