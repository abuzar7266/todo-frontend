import React, { useEffect, useState } from 'react';
import '../asset/css/home.css';
import { Container } from 'react-bootstrap';
import Navigation from '../component/navigation';
import MainDropDown from '../component/MainDropDown';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddItemModal from '../component/addItemModal';
import ItemDetailModal from '../component/itemDetailModal';
import ProfilePictureFrame from '../component/profilePictureFrame';

import { connect, useDispatch } from 'react-redux';
import { fetchTaskData, deleteOneTask, deleteAllTask, addTask, updateTask } from '../redux/actions/taskAction';
import ItemList from '../component/itemList';

const mapStateToProps = (state) => ({
    task_data: state.taskReducer
});

const Home = (props) =>{
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

    const [updateItem, setUpdateItem] = useState({_id:'', task:'', completed:''});
    const [statusUpdate, setStatusUpdate] = useState(0);
    const [start, setStart] = useState(0);

    const [itemModalVar, setItemModalVar] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(statusUpdate===1){
            dispatch(updateTask(updateItem._id, updateItem.task, updateItem.completed));
            setStatusUpdate(0);
        }
        if(listUpdate===1){
            dispatch(fetchTaskData());
            setListUpdate(0);
        }
    },[statusUpdate, listUpdate,setListUpdate])
    useEffect(()=>{
        console.log(props.task_data);
        if(props.task_data.status===1 || props.task_data.status===4){
            toast.error(props.task_data.status_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else if(props.task_data.status===2){
            toast.success(props.task_data.status_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else if(props.task_data.status===3){
            toast.warning(props.task_data.status_msg, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        if(props.task_data.action_type!='GET_TASKS'){
            dispatch(fetchTaskData());
        }
        setIsOpen(false);
        setItemOpt(false);
        setTask(props.task_data.task);
    },[props.task_data]);

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
    const handleNext = () =>{
        if(start+9<task.length){
            setStart(start+9);
        }
    }
    const handleAdd = ()=>{
        dispatch(addTask(newtask));
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
        dispatch(deleteOneTask(_id));
    }
    const handleClearAll = ()=>{
        dispatch(deleteAllTask());
    }
    const handleUpdate = (t,c, _id)=>{
       setUpdateItem({_id:_id, task:t, completed:c});
       setStatusUpdate(1);
    }


    return (<>
    <Container className='container-theme' fluid>
        <ToastContainer/>
        <Container className="focus-container" fluid>
            <AddItemModal onKeyHandler={onKeyHandler} handleCloseModal={handleCloseModal} 
                            showModal={showModal} setNewTask={setNewTask}/>

                            
            <ItemDetailModal show={detailModel} handler={setDetailModel} data={selectedItem} />
            <br />
            <ProfilePictureFrame />



            <MainDropDown handleOpenModal={handleOpenModal} handleClearAll={handleClearAll} 
                        handleToggle={handleToggle} setIsOpen={setIsOpen} show={show} 
                        setShow={setShow} isOpen={isOpen}/>


            <ItemList task={task} handleUpdate={handleUpdate} handleItemToggle={handleItemToggle} 
                        handleDeleteOne={handleDeleteOne} detailModel={detailModel} setDetailModel={setDetailModel}
                        setSelectedItem={setSelectedItem} setItemOpt={setItemOpt} itemOpt={itemOpt} 
                        toggleIdx={toggleIdx} start={start} show={show}/>
                
            <Navigation task={task} handlePrev={handlePrev} start={start} handleNext={handleNext}/>
        </Container>
        </Container></>);
}

export default connect(mapStateToProps)(Home);