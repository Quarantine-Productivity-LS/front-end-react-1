import axios from 'axios'
import moment from 'moment'
export const FETCH_DATA = "FETCH_DATA";
export const POST_DATA = "POST_DATA";
export const EDIT_DATA = "EDIT_DATA";
export const SET_ERROR = "SET_ERROR";
export const SET_ALL_TASKS = "SET_ALL_TASKS";

// sort dates
const compare = (a, b) => {
    const dateA = moment(a.due);
    const dateB = moment(b.due);
  
    let comparison = 0;
    if (dateA.diff(dateB) > 0) {
      comparison = 1;
    }
    else {
      comparison = -1;
    }
    return comparison
  }

export const getData = () => dispatch => {
    dispatch({ type: FETCH_DATA });
    axios.get("https://quarantine-productivity.herokuapp.com/api/tasks").then(response => {
        console.log(response);
        let data = response.data;
        dispatch({ type: SET_ALL_TASKS, payload: data.sort(compare)})
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: {
            key: "fetchError",
            error: error
        } })
    })
}

export const addTask = (tasks, values) => dispatch => {
    dispatch({ type: POST_DATA })
    const newTask = {
        ...values,
        duration: (values.duration) ? values.duration : null,
        tags: values.tags.split(" ").join(""),
        due: (values.due.length > 0) ? values.due : null,
        completed: false
    }
    axios.post("https://quarantine-productivity.herokuapp.com/api/tasks", newTask).then(response => {
        console.log(response);
        let data = [...tasks, {
            ...newTask,
            id: response.data[0]
        }]
        dispatch({ type: SET_ALL_TASKS, payload: data.sort(compare)});
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: {
            key: "postError",
            error: error
        } })
    })
}

export const deleteTask = (tasks, ID) => dispatch => {
    dispatch({ type: EDIT_DATA })
    axios.delete(`https://quarantine-productivity.herokuapp.com/api/tasks/${ID}`).then(response => {
        console.log(response);
        dispatch({ type: SET_ALL_TASKS, payload: tasks.filter(task => (task.id !== ID)) })
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: SET_ERROR, payload: {
            key: "deleteError",
            error: error
        } })
    })
}

export const editTask = (tasks, values) => dispatch => {
    dispatch({ type: EDIT_DATA })
    let duration = parseInt(values.duration);
    if ((values.duration === null) || (values.duration.length <= 0)) {
        duration = null;
    }
    const newTask = {
        ...values,
        duration: duration,
        tags: values.tags.split(" ").join(""),
        due: (values.due === null || values.due.length > 0) ? values.due : null
    }
    console.log(newTask);
    axios.put(`https://quarantine-productivity.herokuapp.com/api/tasks/${values.id}`, newTask).then(response => {
        console.log(response);
        dispatch({ type: SET_ALL_TASKS, payload: tasks.map(task => (task.id === values.id) ? newTask : task)})
    })
    .catch(error => {
        console.log(error);
    })
}