import { TOGGLE_COMPLETION, ADD_TASK } from '../actions/taskActions'

const initialState = {
    loginPage: {
        isFetching: false,
        error: ""
    },
    username: "",
    tasks : [
        {
            id: 1,
            name: "Welcome to Quarantine Productivity",
            tags: ["React"],
            due: "2020-03-30",
            completed: false
        },
        {
            id: 2,
            name: "Try adding a task",
            tags: ["Productivity", "React"],
            due: "2020-03-30",
            completed: false
        },
        {
            id: 3,
            name: "Separate tags in your task with commas",
            tags: ["App"],
            due: "2020-03-30",
            completed: false
        }
    ],
}

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_COMPLETION:
            return {
                ...state,
                loginPage: {...state.loginPage},
                tasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                loginPage: {...state.loginPage},
                tasks: action.payload
            }
        default:
            return {
                ...state,
                loginPage: {...state.loginPage}
            }
    }
}