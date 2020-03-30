const initialState = {
    loginPage: {
        isFetching: false,
        error: ""
    },
    username: "",
    tasks : [],
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