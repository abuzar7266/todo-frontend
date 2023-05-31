import React from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { Row, Col, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import '../asset/css/item.css';
const Item = (props)=>{
    const handleMountUpdate = ()=>{
        props.handleUpdate(props.data.task, true, props.data._id);
    }
    const handleMountItemToggle = ()=>{
        props.handleItemToggle(props.idx);   
    }
    const handleMountDeleteOne = ()=>{
        props.handleDeleteOne(props.data._id);
    }
    const handleMountMore = () =>{
        props.setDetailModel(!props.detailModel);
        props.setSelectedItem(props.data);
        props.setItemOpt(false);
    }
    return (<><Row>
        <Col md={4}></Col>
        <Col>
            <div className={props.theme}>
                <Col md={1}>
                    <div className="item-check" onClick={handleMountUpdate}>
                        {props.data.completed!=true && <CheckCircleOutlineIcon/>}{props.data.completed!=false && <CheckCircleIcon/>}
                    </div>
                </Col>
                <Col md={4}>
                    <div className="tast-text-length" style={{marginLeft:'40px'}}>{props.data.task}</div>
                </Col>
                <Col md={1}>
                <div className="item-option" onClick={handleMountItemToggle}>
                    <DragIndicatorIcon/>
                </div>
                </Col>
            </div>
    </Col>
    <Col><div>
                {props.toggleIdx===props.idx && props.itemOpt && (
                    <Dropdown.Menu
                    className="option-list"
                    show={props.itemOpt}
                    >
                    <Dropdown.Item onClick={handleMountDeleteOne}><DeleteIcon/> Delete </Dropdown.Item>
                    <Dropdown.Item onClick={handleMountMore}><ExpandCircleDownIcon/> More </Dropdown.Item>
                    </Dropdown.Menu>
                )}
            </div></Col>
    </Row></>)
}
export default Item;