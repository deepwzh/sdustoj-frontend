import { combineReducers } from "redux";
import accountReducer from './account';
import courseReducer from "./course";
import uiReducer from "./ui";
const rootReducer = combineReducers({
    auth: accountReducer,
    course: courseReducer,
    ui: uiReducer
});

export default rootReducer;