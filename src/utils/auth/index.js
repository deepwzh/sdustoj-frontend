import { API, getAPIUrl } from '../config';
// let localStorage; 

// // If we're testing, use a local storage polyfill
// if (global.process && process.env.NODE_ENV === 'test') {
//   localStorage = require('localStorage')
// } else {
//   // If not, use the browser one
//   localStorage = global.window.localStorage;
// }
const auth = {
    /**
    * Logs a user in, returning a promise with `true` when done
    * @param  {string} username The username of the user
    * @param  {string} password The password of the user
    */
    login (username, password) {
      if (auth.loggedIn()) return Promise.resolve(true)
      let url = getAPIUrl(API.LOGIN);
      let option = {
        method: 'post',
        mode:'cors',
        headers: {
          // 'X-CSRFTOKEN': token,
          "Content-Type": "application/json" 
        },
        credentials:'include',
        body: JSON.stringify({username, password}),
      };
      // Post a fake request
      return fetch(url, option)
        .then((response) => {
            if(response.status == 200) {
              // localStorage.sessionid = response.token;
              return Promise.resolve(true)
            } else if (response.status == 403){
              throw {message: "认证失败！"};
              return Promise.reject(false);
            } else if (response.status >= 500 ){
              throw {message: "服务器错误！"};
              // return Promise.reject(false);
            }
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
  
  export default auth