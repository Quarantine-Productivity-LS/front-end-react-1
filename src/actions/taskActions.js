export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";
export const ADD_TASK = "ADD_TASK";

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