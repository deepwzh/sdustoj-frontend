import React from 'react';
/*
 * The reducer takes care of state changes in our app through actions
 */

import {
  // RETRIEVE_COURSE_LIST_REQUEST,
  RETRIEVE_COURSE_LIST_RECEIVE,
} from '../actions/constants'

// The initial application state
    let initialState = {

    }
  // Takes care of changing the application state
  function courseReducer (state = initialState, action) {
    switch (action.type) {
      case RETRIEVE_COURSE_LIST_RECEIVE:
        if (action.error) {
            //return Object.assign(state, {error: action.payload, loading: false});
        } else {
            return Object.assign(state, {...action.payload});
        }
      default:
        return state
    }
  }
export default courseReducer;