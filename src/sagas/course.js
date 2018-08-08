// This code snippet is reference to https://github.com/sotojuan/saga-login-flow/
// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import {take, call, put, fork, race} from 'redux-saga/effects'
import course from '../utils/course';
import {
  RETRIEVE_COURSE_LIST_REQUEST,
  RETRIEVE_COURSE_LIST_RECEIVE
} from '../actions/constants'



export function * getCourseListFlow () {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    yield take(RETRIEVE_COURSE_LIST_REQUEST);
    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    try {
        const data = yield call(course.getCourseList);
        yield put({type: RETRIEVE_COURSE_LIST_RECEIVE, error:false, payload: data});
    }catch (error) {
        // If we get an error we send Redux the appropiate action and return
        yield put({type: RETRIEVE_COURSE_LIST_RECEIVE, error: true, payload: error.message})               
    }
  }
}