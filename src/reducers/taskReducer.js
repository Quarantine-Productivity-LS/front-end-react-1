import { TOGGLE_COMPLETION } from '../actions/taskActions'

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
            completed: false
        },
        {
            id: 2,
            name: "Try adding a task",
            tags: ["Productivity", "React"],
            completed: false
        },
        {
            id: 3,
            name: "Separate tags in your task with commas",
            tags: ["App"],
            completed: true
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
        default:
            return {
                ...state,
                loginPage: {...state.loginPage}
            }
    }
}