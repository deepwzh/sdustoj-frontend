import {SET_SIDERBAR_DATASOURCE} from '../actions/constants';

// The initial application state
let initialState = {
    siderbar: {
        dataSource: []
    }
}
// Takes care of changing the application state
function uiReducer (state = initialState, action) {
    switch (action.type) {
    case SET_SIDERBAR_DATASOURCE:
        if (!action.error) {
            return Object.assign(state, {
                siderbar: {
                    dataSource: action.payload
                }
            });
        } else {
            //TODO: 
        }
    default:
        return state
    }
}
export default uiReducer;