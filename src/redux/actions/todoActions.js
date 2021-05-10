import Axios from "axios";
import todoTypes from "../types/todoTypes";
import {API_URL} from '../Config'

export const getTodos = (url) => {
    return dispatch =>{
      Axios.get(url)
        .then((res) => {
          dispatch({
            type: todoTypes.GET_TODOS,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
  };

  export const addTodos = (title) => {
    return dispatch =>{
      Axios.post(`${API_URL}todos/`,{title})
        .then((res) => {
          dispatch({
            type: todoTypes.ADD_TODO,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deleteTodosComplete =() => {
    return dispatch =>{
      Axios.delete(`${API_URL}todos/`)
        .then((res) => {
          dispatch({
            type: todoTypes.GET_TODOS,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
  };

  export const updateTodos = (todoId,todo) => {
    return dispatch =>{
      Axios.put(`${API_URL}todos/${todoId}`,todo)
        .then((res) => {
          dispatch({
            type: todoTypes.UPDATE_TODO,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
  };
  export const deleteTodos = (todoId) => {
    return dispatch =>{
      Axios.delete(`${API_URL}todos/${todoId}`)
        .then((res) => {
          dispatch({
            type: todoTypes.DELETE_TODO,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
  };