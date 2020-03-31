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
            description: "Take a look around!",
            tags: ["React"],
            due: "2020-03-30",
            duration: 1, // in minutes
            completed: false
        },
        {
            id: 2,
            name: "Try adding a task",
            description: "Click on the plus at the bottom to expand the form to add a new task",
            tags: ["Productivity", "React"],
            due: "2020-03-30",
            duration: 1,
            completed: false
        },
        {
            id: 3,
            name: "Separate tags in your task with commas",
            description: "You'll see any new tags you make pop up at the bar above, so you can filter your tasks by tag!",
            tags: ["App"],
            due: "2020-03-30",
            duration: 1,
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