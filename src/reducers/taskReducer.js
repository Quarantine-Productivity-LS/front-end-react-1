import { FETCH_DATA, POST_DATA, SET_ALL_TASKS, SET_ERROR, EDIT_DATA } from '../actions/taskActions'

const initialState = {
    data: {
        isFetching: false,
        isPosting: false,
        isDeleting: false,
        isEditing: false,
        fetchError: "",
        postError: "",
        deleteError: ""
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

export const considerations = {
    exercise: [
        "Go for a jog",
        "Do 50 push-ups",
        "Run on treadmill",
        "Evening walk around the neighborhood",
        "Do 50 squats",
        "Do 50 pull-ups",
        "Wall-sits",
        "Do 50 crunches",
        "Do 50 Russian twists",
        "Ride on eliptical bike",
        "Ride bicycle around the neighborhood",
        "Work out with dumbbells",
        "Work out with a barbell",
        "Do 10 sets of deadlifts"
    ],
    learning: [
        "Watch a history documentary",
        "Watch a nature documentary",
        "Read a chapter out of your favorite book",
        "Watch a 3D modeling tutorial",
        "Watch a drawing tutorial",
        "Learn about C++",
        "Learn about C#",
        "Learn about Python",
        "Watch a YouTube science show",
        "Research an interesting topic",
        "Look up math exercises",
        "Practice an instrument",
        "Read through the news"

    ],
    lounging: [
        "Make a sandwich",
        "Take a break and watch a movie",
        "Read a few pages from a book",
        "Play an instrument",
        "Take a car ride",
        "Make an omelette",
        "Read through the news",
        "Listen to music and study",
    ],
    career: [
        "Improve your portfolio",
        "Improve your resume",
        "Network with coworkers",
        "Complete a project",
    ]
}

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    isFetching: !state.data.isFetching,
                    error: ""
                }
            }
        case POST_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    isPosting: !state.data.isPosting,
                    error: ""
                }
            }
        case EDIT_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    isDeleting: !state.data.isDeleting,
                    error: ""
                }
            }
        case SET_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    isFetching: false,
                    isPosting: false,
                    isDeleting: false,
                    [action.payload.key]: action.payload.error
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
                    error: ""
                }
            }
        default:
            return {
                ...state,
                data: {...state.data}
            }
    }
}