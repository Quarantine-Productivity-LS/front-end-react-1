const initialState = {
    loginPage: {
        isFetching: false,
        error: ""
    },
    username: "",
    tasks : [
        {
            name: "Welcome to Quarantine Productivity",
            tags: ["React"],
            completed: false
        },
        {
            name: "Try adding a task",
            tags: ["Productivity", "React"],
            completed: false
        }
    ],
}

export const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return {
                ...state,
                loginPage: {...state.loginPage}
            }
    }
}