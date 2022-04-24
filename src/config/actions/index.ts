import axios from "axios"
type QUERYPARAMS = {
    isParams: {
        page: number,
        results: number,
        gender: string
    }
}
export const requestUserListing: any = ({ isParams }: QUERYPARAMS) => async (dispatch: any) => {
    dispatch({ type: "REQUEST_USERS" });
    const { data } = await axios.get('https://randomuser.me/api/', {
        params: {
            results: isParams.results,
            gender: isParams.gender
        },
    })
    dispatch({
        type: "GET_USERS",
        payload: {
            ...data,
            results: data.results.map((item: any) => ({
                ...item,
                username: item.name.first,
                name: item.name.title + " " + item.name.first + " " + item.name.last,
                registered: item.registered.date,
                age: item.registered.age
            }))
        }
    });
}
type QUERYSORTED = { data: [any] }
export const requestUserAction: any = ({ data }: QUERYSORTED) => async (dispatch: any, getState: any) => {
    dispatch({ type: "REQUEST_USERS" });
    await dispatch({
        type: "GET_USERS",
        payload: {
            ...getState().userList,
            results: data
        }
    })
}
