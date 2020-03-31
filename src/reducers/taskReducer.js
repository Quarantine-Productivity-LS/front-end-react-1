import { TOGGLE_COMPLETION, FETCH_DATA, POST_DATA, DELETE_DATA, SET_ALL_TASKS } from '../actions/taskActions'

const initialState = {
    data: {
        isFetching: false,
        isPosting: false,
        isDeleting: false,
        error: ""
    },
    username: "",
    tasks : [
        // {
        //     id: 1,
        //     taskName: "Welcome to Quarantine Productivity",
        //     tags: "React",
        //     due: "2020-03-30",
        //     description: "Take a look around",
        //     completed: false
        // },
        // {
        //     id: 2,
        //     taskName: "Try adding a task",
        //     tags: "Productivity, React",
        //     due: "2020-03-30",
        //     description: "Press the + button below to expand the form",
        //     completed: false
        // },
        // {
        //     id: 3,
        //     taskName: "Separate tags in your task with commas",
        //     tags: "App",
        //     due: "2020-03-30",
        //     description: "Your tags will appear in the bar at the top!",
        //     completed: false
        // }
    ],
}

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    isFetching: true
                }
            }
        case POST_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    isPosting: true
                }
            }
        case DELETE_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    isDeleting: true
                }
            }
        case SET_ALL_TASKS:
            return {
                ...state,
                tasks: action.payload,
                data: {
                    ...state.data,
                    isFetching: false,
                    isPosting: false,
                    isDeleting: false,
                }
            }
        case TOGGLE_COMPLETION:
            return {
                ...state,
                data: {...state.data},
                tasks: action.payload
            }
        default:
            return {
                ...state,
                data: {...state.data}
            }
    }
}