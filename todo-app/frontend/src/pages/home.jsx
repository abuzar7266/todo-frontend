import React, { useEffect, useState } from 'react';
import '../asset/css/home.css';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dropdown from 'react-bootstrap/Dropdown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Profile_Pic from '../asset/img/profile-pic.jpg'
import axios from 'axios';
const task=[
    {
        task:'Task-1',
        completed: true,
        _id:"1"
    },
    {
        task:'Task-2',
        completed: false,
        _id:"2"
    },
    {
        task:'Task-3',
        completed: true,
        _id:"3"
    },
    {
        task:'Task-4',
        completed: true,
        _id:"4"
    },
    {
        task:'Task-5',
        completed: true,
        _id:"5"
    },
    {
        task:'Task-6',
        completed: true,
        _id:"6"
    },
    {
        task:'Task-7',
        completed: true,
        _id:"7"
    },
    {
        task:'Task-8',
        completed: true,
        _id:"8"
    },
    {
        task:'Task-9',
        completed: true,
        _id:"9"
    },
    {
        task:'Task-10',
        completed: true,
        _id:"10"
    },
    {
        task:'Task-11',
        completed: true,
        _id:"11"
    },
    {
        task:'Task-1',
        completed: true,
        _id:"12"
    },
    {
        task:'Task-2',
        completed: false,
        _id:"13"
    },
    {
        task:'Task-3',
        completed: true,
        _id:"14"
    },
    {
        task:'Task-4',
        completed: true,
        _id:"15"
    },
    {
        task:'Task-5',
        completed: true,
        _id:"16"
    },
    {
        task:'Task-6',
        completed: true,
        _id:"17"
    },
    {
        task:'Task-7',
        completed: true,
        _id:"18"
    },
    {
        task:'Task-8',
        completed: true,
        _id:"19"
    },
    {
        task:'Task-9',
        completed: true,
        _id:"20"
    },
    {
        task:'Task-10',
        completed: true,
        _id:"21"
    },
    {
        task:'Task-11',
        completed: true,
        _id:"22"
    }
]
const Home = () =>{
    const [detailModel, setDetailModel] = useState(false);
    const [task,setTask] = useState([]);
    const [itemOpt, setItemOpt] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [newtask,setNewTask] = useState("");
    const [taskUploaded, setTaskUploaded] = useState(true);
    const [toggleIdx,setToggleIdx] = useState(0);
    const [listUpdate,setListUpdate] = useState(1);
    const [selectedItem,setSelectedItem] = useState(null);
    useEffect(()=>{
        if(listUpdate==1){
        axios.get("http://localhost:3001/",{}).then((data)=>{
        console.log(data);   
        setTask(data.data.tasks);
        setListUpdate(0);
        })
        }
    },[listUpdate,setListUpdate])
    const handleOpenModal = () => {
        setItemOpt(false);
        setIsOpen(false);
        setTaskUploaded(false);
        setNewTask("");
        setShowModal(true);
    };
    const handleItemToggle = (idx)=>{
        setIsOpen(false);
        if(itemOpt){
            setToggleIdx(-1);
        }else{
            setToggleIdx(idx);
        }
        setItemOpt(!itemOpt);
    }
    const handleCloseModal = () => {
        setItemOpt(false);
        setIsOpen(false);
        setTaskUploaded(false);
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
        axios.post("http://localhost:3001/",{
            task:newtask
        }).then((x)=>{
            console.log(x);
            if(x.data.status==false){
                console.log('Error');
            }else{
                setListUpdate(1);
            }
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
        if(e.key=='Enter'){
            // Add Task to List Here - Call API
            handleAdd();
            setShowModal(false);
        }
    }
    const handleDeleteOne = (_id)=>{
        // Call API for deleteOne
        axios.delete(`http://localhost:3001/${_id}`,{}).then((res)=>{
            console.log(res);
            if(res.data.status==true){
                setListUpdate(1);
            }else{
                alert("Error: Task does not exist in TO DO List");
            }
            setItemOpt(false);
        })
    }
    const handleClearAll = ()=>{
        axios.delete("http://localhost:3001/",{}).then((res)=>{
            if(res.data.status==true){
                setListUpdate(1);
            }else{
                alert("Error: List is already empty");
            }
            setIsOpen(false);
        })
    }
    const handleUpdate = (t,c, _id)=>{
        axios.put(`http://localhost:3001/${_id}`,{
            task:t,
            completed:c
        }).then((res)=>{
            if(res.data.status==true){
                setListUpdate(1);
            }else{
                alert("Error: Completed tasks can not be undo");
            }
        })
    }
    return (<><Container className='container-theme' style={{height:"100vh", width: "100%"}} fluid>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add TODO Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name="task" placeholder="Write Task" onChange={(e)=>{setNewTask(e.target.value)}} style={{height:'40px', width:'465px', border:'0', borderBottom:'1px solid gray', paddingLeft:'10px'}} onKeyPress={onKeyHandler}/>
        </Modal.Body>
      </Modal>
      <Modal show={detailModel} onHide={()=>{setDetailModel(!detailModel)}}>
        <Modal.Header closeButton>
          <Modal.Title>Item Detail</Modal.Title>
        </Modal.Header>
        {selectedItem!=null && <Modal.Body>
          <h6>TO DO: {selectedItem._id}</h6> <br />
          <h6>TO DO: {selectedItem.task}</h6> <br />
          <h6>{selectedItem.completed==true && <div>STATUS: COMPLETED</div>}{selectedItem.completed==false && <div>STATUS: NOT COMPLETED</div>}</h6> <br />
          <h6>CREATED ON : {(Date(selectedItem.creation_time))}</h6> 
        </Modal.Body>}
      </Modal>
            <br />
            <Row>
                <Col md={5}></Col>
                <Col md={1}>
                    <img src={Profile_Pic} alt="Profile Picture" fluid height="120" style={{borderRadius:'100px', border:'1px solid gray', boxShadow:'black 0px 10px 10px'}}/>
                </Col>
            </Row>
            <Row style={{marginTop:'3vh'}}>
            <Col md={4}></Col><Col><div className="button-theme"><div style={{marginLeft:'10px',color:'black', opacity:'40%'}}>
                <div style={{ position: 'relative', zIndex: 999 }} onClick={handleToggle}>
                <MenuIcon/>
    </div>
    <div>
    {isOpen && (
        <Dropdown.Menu
          style={{ position: 'absolute', top: '10%', left: '-55%', zIndex: 999 , opacity:'100%'}}
          show={isOpen}
        >
          <Dropdown.Item onClick={handleOpenModal}><AddCircleIcon/> Add Task</Dropdown.Item>
          <Dropdown.Item onClick={handleClearAll}><DeleteIcon/> Clear All</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </div>
    </div><div style={{marginLeft:'40px'}} onClick={()=>{setIsOpen(false)}}>To do today</div><div style={{marginLeft:'90px', color:'black', opacity:'40%'}} onClick={()=>{setShow(!show);setIsOpen(false);}}>{ show==false && <ExpandMoreIcon/>}{ show==true && <ExpandLessIcon/>} </div></div></Col>
            </Row>
            { show==true && <div style={{zIndex:'0'}}>
            {
                task.map((data, idx)=>{
                    var theme = "none";
                    if(idx-start<9 && idx-start>=0){
                    if(idx-start==0){
                            theme = "top-item-theme"
                        }
                        else{
                            if(idx-start==8){
                                theme = "bottom-item-theme"
                            }else if(idx-start>0){
                                theme = "mid-item-theme"
                            }
                        }
                    return (
                        <Row>
                            <Col md={4}></Col>
                            <Col>
                                <div className={theme}>
                                    <Col md={1}>
                                        <div style={{marginLeft:'10px',color:'black', opacity:'40%'}} onClick={()=>{handleUpdate(data.task, true, data._id)}}>
                                            {data.completed!=true && <CheckCircleOutlineIcon/>}{data.completed!=false && <CheckCircleIcon/>}
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="tast-text-length" style={{marginLeft:'40px'}}>{data.task}</div>
                                    </Col>
                                    <Col md={1}>
                                    <div style={{marginLeft:'130px', color:'black', opacity:'40%', cursor:'pointer'}} onClick={()=>{handleItemToggle(idx)}}>
                                        <DragIndicatorIcon/>
                                    </div>
                                    </Col>
                                </div>
                        </Col>
                        <Col><div>
                                    {toggleIdx==idx && itemOpt && (
                                        <Dropdown.Menu
                                        style={{left:'55.3%', opacity:'80%'}}
                                        show={itemOpt}
                                        >
                                        <Dropdown.Item onClick={()=>{handleDeleteOne(data._id)}}><DeleteIcon/> Delete </Dropdown.Item>
                                        <Dropdown.Item onClick={()=>{setDetailModel(!detailModel);setSelectedItem(data);setItemOpt(false)}}><ExpandCircleDownIcon/> More </Dropdown.Item>
                                        </Dropdown.Menu>
                                    )}
                                </div></Col>
                        </Row>)
                }})
            }
            <Row style={{marginTop:'1vh'}}>
                <Col md={4}></Col><Col md={2}>{ start>=8 && <div style={{textAlign:'center', color:'black', width:'50px', borderRadius:'10px', opacity:'100%', background:'white', cursor:'pointer'}} onClick={handlePrev}><ArrowBackIcon/></div>}</Col><Col md={2}>{ start+9<task.length && <div style={{marginLeft:'15px', textAlign:'center', color:'black', width:'50px', borderRadius:'10px', opacity:'100%', background:'white', cursor:'pointer'}} onClick={handleNext}><ArrowForwardIcon/></div>}</Col><Col md={4}></Col>
            </Row>
            </div>}
        </Container></>);
}
export default Home;