const initialState = {
    loading: false,
    results: [],
    info: {
        page: 0,
        results: 0
    }
}
const userList = (state = initialState, action: any) => {
    switch (action.type) {
        case 'REQUEST_USERS':
            return {
                ...state,
                loading: true
            }
        case 'GET_USERS':
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        default:
            return state
    }
}
export default userList