import { combineReducers } from "redux";
import accountReducer from './account';
import courseReducer from "./course";
const rootReducer = combineReducers({
    auth: accountReducer,
    course: courseReducer,
});

export default rootReducer;