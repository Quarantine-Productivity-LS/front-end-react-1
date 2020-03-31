import axios from 'axios'
export const FETCH_DATA = "FETCH_DATA";
export const POST_DATA = "POST_DATA";
export const DELETE_DATA = "DELETE_DATA";
export const SET_ALL_TASKS = "SET_ALL_TASKS";
export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";

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
    dispatch({ type: POST_DATA })
    const newTask = {
        ...values,
        tags: values.tags.replace(" ", ""),
        duration: 0,
        completed: false
    }
    axios.post("https://quarantine-productivity.herokuapp.com/api/tasks", newTask).then(response => {
        console.log(response);
        dispatch({ type: SET_ALL_TASKS, payload: [...tasks, {
            ...newTask,
            id: response.data[0]
        }]});
    })
    .catch(error => {
        console.log(error);
    })
}

export const deleteTask = (tasks, ID) => dispatch => {
    dispatch({ type: DELETE_DATA })
    axios.delete(`https://quarantine-productivity.herokuapp.com/api/tasks/${ID}`).then(response => {
        console.log(response);
        dispatch({ type: SET_ALL_TASKS, payload: tasks.filter(task => (task.id !== ID)) })
    })
    .catch(error => {
        console.log(error);
    })
}