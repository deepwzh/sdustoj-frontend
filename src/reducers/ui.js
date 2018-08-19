import {SET_SIDERBAR_DATASOURCE, SET_SIDERBAR_KEY, SET_MAINMENU_KEY} from '../actions/constants';

// The initial application state
let initialState = {
    siderbar: {
        dataSource: [],
        key: '0'
    },
    mainMenuKey: '0',
}
// Takes care of changing the application state
function uiReducer (state = initialState, action) {
    switch (action.type) {
    case SET_SIDERBAR_DATASOURCE:
        if (!action.error) {
            let newSiderbar = Object.assign({}, state.siderbar, {dataSource: action.payload});
            return Object.assign(state, {
                siderbar: newSiderbar
            });
        } else {
            //TODO: 
        }
        break;
    case SET_SIDERBAR_KEY:
        if(!action.error) {
            let newSiderbar = Object.assign({}, state.siderbar, {key: action.key});
            return Object.assign(state, {siderbar: newSiderbar}
            );
        } else {
            // TODO:
        }
        break;
    case SET_MAINMENU_KEY:
        if(!action.error) {
            return Object.assign(state, {mainMenuKey: action.key});
        } else {
            // TODO:
        }
        break;
    default:
        return state;
    }
}
export default uiReducer;