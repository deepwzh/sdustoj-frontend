import {
    SET_AUTH,
    SENDING_REQUEST,
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    LOGOUT,
    REQUEST_ERROR,
    CLEAR_ERROR,
    LEARNING_COURSES_LIST_REQUEST,
    LEARNING_COURSES_LIST_RECEIVE
  } from './constants'
  
  /**
   * Sets the authentication state of the application
   * @param  newAuthState{boolean} 授权状态，True为授权
   * @param  username{String} 用户名
   */
  export function setAuthState (newAuthState, username) {
    return {type: SET_AUTH, newAuthState, username}
  }
  
  /**
   * Sets the `currentlySending` state, which displays a loading indicator during requests
   * @param  {boolean} sending True means we're sending a request, false means we're not
   */
  export function sendingRequest (sending) {
    return {type: SENDING_REQUEST, sending}
  }
  
  /**
   * Tells the app we want to log in a user
   * @param  {object} data          The data we're sending for log in
   * @param  {string} data.username The username of the user to log in
   * @param  {string} data.password The password of the user to log in
   */
  export function loginRequest (data) {
    return {type: LOGIN_REQUEST, data}
  }
  
  /**
   * Tells the app we want to log out a user
   */
  export function logout () {
    return {type: LOGOUT}
  }
  
  /**
   * Tells the app we want to register a user
   * @param  {object} data          The data we're sending for registration
   * @param  {string} data.username The username of the user to register
   * @param  {string} data.password The password of the user to register
   */
  export function registerRequest (data) {
    return {type: REGISTER_REQUEST, data}
  }
  
  /**
   * Sets the `error` state to the error received
   * @param  {object} error The error we got when trying to make the request
   */
  export function requestError (error) {
    return {type: REQUEST_ERROR, error}
  }
  
  /**
   * Sets the `error` state as empty
   */
  export function clearError () {
    return {type: CLEAR_ERROR}
  }

  export function learningCoursesListRequest() {
    return {type: LEARNING_COURSES_LIST_REQUEST}
  }
  export function learningCoursesListResponse(error, payload) {
    return {type: LEARNING_COURSES_LIST_RECEIVE, error, payload}
  }