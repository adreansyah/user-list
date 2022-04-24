import { combineReducers } from "redux"
import userList from "./userList"

const rootReducers = combineReducers<object>({
    userList
})
export default rootReducers