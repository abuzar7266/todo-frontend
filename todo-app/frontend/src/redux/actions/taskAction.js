// actions.js
import axios from 'axios';

export const fetchTaskData = () => {
    return (dispatch) => {
        axios
          .get(`${process.env.REACT_APP_SERVICE_URL}`, {})
          .then((response) => {
            const tasks = response.data.tasks;
            dispatch({
              type: 'GET_TASKS',
              payload: {
                task:tasks,
                status: 0,
                status_msg:''
              } 
            });
          })
          .catch((error) => {
            dispatch({
                type: 'GET_TASKS',
                payload: {
                task: [],
                status: 1,
                status_msg:'Error!'
                }
            });
          });
    }; 
};

export const deleteOneTask = (id) =>{
    return (dispatch) => {
        axios
            .delete(`${process.env.REACT_APP_SERVICE_URL}${id}`,{})
            .then((res)=>{
                var status = 0;
                var status_msg = '';
                if(res.data.status===true){
                    status = 2;
                    status_msg = 'Successfully deleted the item';
                }else{
                    status = 1;
                    status_msg = 'Error! Item does not exist';
                }
                dispatch({
                    type: 'DELETE_ONE_TASK',
                    payload: {
                      status:status,
                      status_msg:status_msg
                    } 
                });
            })
            .catch((err)=>{
                dispatch({
                    type: 'DELETE_ONE_TASK',
                    payload: {
                    status:4,
                    status_msg:'Error!'
                    } 
                });
            })
    };
}

export const deleteAllTask = () =>{
    return (dispatch)=>{
        axios.delete(`${process.env.REACT_APP_SERVICE_URL}`,{}).then((res)=>{
            let status = 0;
            let status_msg = 0;
            if(res.data.status===true){
                status = 2;
                status_msg = 'Cleared the item list';
            }else{
                status = 1;
                status_msg = 'Warning! List is already empty';
            }
            dispatch({
                type: 'DELETE_ALL_TASK',
                payload: {
                  status:status,
                  status_msg:status_msg
                } 
            });
        })
        .catch((err)=>{
            dispatch({
                type: 'DELETE_ALL_TASK',
                payload: {
                status:4,
                status_msg:'Error!'
                } 
            });
        })
    }
}
export const addTask = (newTask) =>{
    return (dispatch)=>{
        axios.post(`${process.env.REACT_APP_SERVICE_URL}`,{task:newTask})
            .then((x)=>{
                let status = 0;
                let status_msg = '';
                if(x.data.status===false){
                    status = 1;
                    status_msg = "Error! Failed to add item";
                }else{
                    status = 2;
                    status_msg = "New item added!";
                }
                dispatch({
                    type: 'ADD_TASK',
                    payload: {
                      status:status,
                      status_msg:status_msg
                    } 
                });
            })
            .catch((err)=>{
                dispatch({
                    type: 'ADD_TASK',
                    payload: {
                        status:4,
                        status_msg:'Error!'
                    } 
            });
        })
    }
}
  
export const updateTask = (_id, t, c) =>{
    console.log('Hi');
    return (dispatch)=>{
        axios.put(`${process.env.REACT_APP_SERVICE_URL}${_id}`,{
            task:t,
            completed:c
        })
        .then((res)=>{
            let status = 0;
            let status_msg = '';
            if(res.data.status===true){
                status = 2;
                status_msg = "Item marked as done";
            }
            else{
                status = 3;
                status_msg = "Warning! Completed tasks can not be undone!";
            }
            dispatch({
                type: 'UPDATE_TASK',
                payload: {
                  status:status,
                  status_msg:status_msg
                } 
            });
        })
        .catch((err)=>{
            dispatch({
                type: 'UPDATE_TASK',
                payload: {
                    status:4,
                    status_msg:'Error!'
                } 
            });
        })
    }
}