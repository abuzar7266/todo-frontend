import React from 'react'
import {Modal} from 'react-bootstrap'
const AddItemModal = ({showModal, handleCloseModal, onKeyHandler, setNewTask}) =>{
    return (<>
    <div style={{zIndex:'1000', position:'absolute'}}>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add TODO Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input className="add-item-modal" type="text" name="task" placeholder="Write Task" onChange={(e)=>{setNewTask(e.target.value)}} onKeyPress={onKeyHandler}/>
            </Modal.Body>
        </Modal>
    </div>
    </>)
}
export default AddItemModal;