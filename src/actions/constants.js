/*
 * These are the variables that determine what our central data store (`../reducers/index.js`)
 * changes in our state.
 */

export const SET_AUTH = 'SET_AUTH'; //设置授权状态
export const SENDING_REQUEST = 'SENDING_REQUEST'; //正在发送登录请求
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; //登录请求
export const REGISTER_REQUEST = 'REGISTER_REQUEST';//注册请求
export const LOGOUT = 'LOGOUT'//注销
export const REQUEST_ERROR = 'REQUEST_ERROR'; //请求失败
export const CLEAR_ERROR = 'CLEAR_ERROR'; //清除失败状态 


export const RETRIEVE_COURSE_LIST_REQUEST = 'RETRIEVE_COURSE_LIST_REQUEST';
export const RETRIEVE_COURSE_LIST_RECEIVE = 'RETRIEVE_COURSE_LIST_RECEIVE';

export const SET_SIDERBAR_DATASOURCE = 'SET_SIDERBAR_DATASOURCE';