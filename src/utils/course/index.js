import { API, getAPIUrl } from '../config';
const course = {
    /**
    * Logs a user in, returning a promise with `true` when done
    * @param  {string} username The username of the user
    * @param  {string} password The password of the user
    */
    getCourseList() {
      let url = getAPIUrl(API.LEARNING_COURSES_LIST);
        let option = {
            method:'get',
            mode:'cors',
            credentials: "include"
        };
      return fetch(url, option)
        .then((response) => response.json())
        .then((data) => {
            return Promise.resolve(data.results)
        })
      .catch((err) => Promise.reject(err))
    },
    /**
    * Logs the current user out
    */
    // logout () {
    //   return request.post('/logout')
    // },
    /**
    * Checks if a user is logged in
    */
    loggedIn () {
      return false;
      // return !!localStorage.sessionid
    },
    /**
    * Registers a user and then logs them in
    * @param  {string} username The username of the user
    * @param  {string} password The password of the user
    */
    // register (username, password) {
    //   // Post a fake request
    //   return request.post('/register', {username, password})
    //     // Log user in after registering
    //     .then(() => auth.login(username, password))
    // },
    onChange () {}
  }
  
export default course;