import React from 'react'
import {Modal} from 'react-bootstrap'
const itemDetailModal = ({show, handler, data}) =>{
    return (<>
    <div style={{zIndex:'1000', position:'absolute'}}>
        <Modal show={show} onHide={()=>{handler(!show)}} className='modal-item'>
                <Modal.Header closeButton>
                    <Modal.Title>Item Detail</Modal.Title>
                </Modal.Header>
                {
                    data!=null && 
                    (<Modal.Body>
                        <h6>Item#: {data._id}</h6> <br />
                        <h6>TO DO: {data.task}</h6> <br />
                        <h6>{data.completed===true && <div>STATUS: COMPLETED</div>}{data.completed===false && <div>STATUS: NOT COMPLETED</div>}</h6> <br />
                        <h6>CREATED ON : {(Date(data.creation_time))}</h6> 
                    </Modal.Body>)
                }
        </Modal>
    </div>
    </>)
}
export default itemDetailModal;