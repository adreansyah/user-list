interface INITIALSTATE {
    loading: boolean,
    results: Array<any>,
    info: {
        page: number,
        results: 0
    },
    options: Array<{ label: string, value: string }>
}
const initialState: INITIALSTATE = {
    loading: false,
    results: [],
    info: {
        page: 0,
        results: 0
    },
    options: [{
        label: "Male",
        value: "male"
    }, {
        label: "Female",
        value: "female"
    }]
}
const userList = (state = initialState, action: any): INITIALSTATE => {
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