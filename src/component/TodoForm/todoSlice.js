import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import * as _ from 'lodash'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
      value: [],
      loader: false,
      message: "",
      alert: false
    },
    reducers: {
      addToList: (state, action) => {
        let incompleteList = action.payload.filter(el => el.completed_at == null)
        incompleteList = _.orderBy(incompleteList, ['created_at'],['desc']);
        let completeList = action.payload.filter(el => el.completed_at != null)
        completeList = _.orderBy(completeList, ['completed_at'],['asc']);

        state.value = [
          ...incompleteList, ...completeList
        ]
        state.loader = false
      },
      startLoader: state => {
        state.loader = true
      },
      showAlert : (state, action) => {
        state.alert = action.payload.alert;
        state.message = action.payload.message;
      }
    },
  });
  
  export const { addToList, startLoader, showAlert } = todoSlice.actions;

  export const createTask = task => dispatch => {
    dispatch(startLoader())
    axios.post('https://tiny-list.herokuapp.com/api/v1/users/111/tasks', {
      "task": {
        "description": task
      }
    }).then(function (response) {
        dispatch(fetchTasks());
    }).catch(err => {
      dispatch(showAlert({alert:true, message:"Error!!"}))
    })    
  };

  export const fetchTasks = () => dispatch => {
    dispatch(startLoader())
    axios.get('https://tiny-list.herokuapp.com/api/v1/users/111/tasks').then(function (response) {
        dispatch(addToList(response.data));
    }).catch(err => {
      dispatch(showAlert({alert:true, message:"Error!!"}))
    })    
  };

  export const deleteTask = task => dispatch => {
    dispatch(startLoader())
    axios.delete(`https://tiny-list.herokuapp.com/api/v1/users/111/tasks/${task}`).then(function (response) {
      dispatch(fetchTasks());
      dispatch(showAlert({alert:true, message:"Task Deleted!"}))
    }).catch(err => {
      dispatch(showAlert({alert:true, message:"Error!!"}))
    })      
  };

  export const completeTask = task => dispatch => {
    dispatch(startLoader())
    axios.put(`https://tiny-list.herokuapp.com/api/v1/users/111/tasks/${task}/completed`).then(function (response) {
      dispatch(fetchTasks());
      dispatch(showAlert({alert:true, message:"Task Completed!"}))
    }).catch(err => {
      dispatch(showAlert({alert:true, message:"Error!!"}))
    })      
  };

  export const unCompleteTask = task => dispatch => {
    dispatch(startLoader())
    axios.put(`https://tiny-list.herokuapp.com/api/v1/users/111/tasks/${task}/uncompleted`).then(function (response) {
      dispatch(fetchTasks());
      dispatch(showAlert({alert:true, message:"Task Uncompleted!"}))
    }).catch(err => {
      dispatch(showAlert({alert:true, message:"Error!!"}))
    })      
  };

  export const editTaskPost = (taskId, description )=> dispatch => {
    dispatch(startLoader())
    axios.put(`https://tiny-list.herokuapp.com/api/v1/users/111/tasks/${taskId}`, { task : { description } }).then(function (response) {
      dispatch(fetchTasks());
      dispatch(showAlert({alert:true, message:"Task Edited!"}))
    }).catch(err => {
      dispatch(showAlert({alert:true, message:"Error!!"}))
    })      
  };

  export const editTask = (data) => dispatch => {
    dispatch(addToList(data));   
  };


  export const selectTodo = state => state.todo.value;

  export const selectLoader = state => state.todo.loader;

  export const getState = state => state.todo;


  export default todoSlice.reducer;