import React from 'react';
/*
 * The reducer takes care of state changes in our app through actions
 */

import {
    LEARNING_COURSES_LIST_REQUEST,
    LEARNING_COURSES_LIST_RECEIVE,
} from '../actions/constants'

// The initial application state
    let initialState = {
    error: null,
    loading: false,
    courseList: []
    }
  // Takes care of changing the application state
  function courseReducer (state = initialState, action) {
    switch (action.type) {
      case LEARNING_COURSES_LIST_RECEIVE:
        if (action.error) {
            return Object.assign(state, {error: action.payload, loading: false});
        } else {
            return Object.assign(state, {courseList: action.payload, loading: false});
        }
      case LEARNING_COURSES_LIST_REQUEST:
        return {...state, loading: true}
      default:
        return state
    }
  }
export default courseReducer;