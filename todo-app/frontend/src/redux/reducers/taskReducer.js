const initialState = {
  action_type:'UNDEFINED',
  status:0,
  status_msg:'',
  task: []
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return {...state, task: action.payload.task, status: action.payload.status, status_msg:action.payload.status_msg, action_type: action.type};
    case 'DELETE_ONE_TASK':
      return {...state, status: action.payload.status, status_msg:action.payload.status_msg, action_type: action.type};
    case 'DELETE_ALL_TASK':
      return {...state, status: action.payload.status, status_msg:action.payload.status_msg, action_type: action.type};
    case 'ADD_TASK':
      return {...state, status: action.payload.status, status_msg:action.payload.status_msg, action_type: action.type};
    case 'UPDATE_TASK':
      return {...state, status: action.payload.status, status_msg:action.payload.status_msg, action_type: action.type};
    default:
      return state;
  }
};

export default taskReducer;