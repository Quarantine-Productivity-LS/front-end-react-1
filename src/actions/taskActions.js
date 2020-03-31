import axios from 'axios'
export const FETCH_DATA = "FETCH_DATA";
export const SET_ALL_TASKS = "SET_ALL_TASKS";
export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";
export const ADD_TASK = "ADD_TASK";

export const getData = () => dispatch => {
    dispatch({ type: FETCH_DATA });
    axios.get("https://quarantine-productivity.herokuapp.com/api/tasks").then(response => {
        console.log(response);
        dispatch({ type: SET_ALL_TASKS, payload: response.data})
    })
    .catch(error => {
        console.log(error);
    })
}

export const toggleCompletion = (tasks, id) => dispatch => {
    dispatch({ type: TOGGLE_COMPLETION, payload: tasks.map(task => {
        return ((task.id === id) ? {
            ...task,
            completed: !task.completed
        } : task)
    })})
}

export const addTask = (tasks, values) => dispatch => {
    dispatch({ type: ADD_TASK, payload: [...tasks, {
        id: tasks[tasks.length - 1].id + 1,
        ...values,
        tags: values.tags.split(","),
        completed: false
    }]});
}