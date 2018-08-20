import { API, getAPIUrl } from '../config';
import { addIndexToArray } from '../common';
import assert from 'assert';
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
            return Promise.resolve(addIndexToArray(data.results))
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

function getStudentItem(item) {
    let raw_data = item.split(/[\s\t]+/);
    console.log(raw_data);
    return ({
        username:raw_data[0],
        available:true,
        deleted:false,
        password:raw_data[0],
        student_id:raw_data[0],
        name:raw_data[1],
        major:null,
        grade:null,
        class_in:null,
    });
}

/**
 * 将用户输入的学生信息由csv格式的字符串转换成Object数组
 * @param {String} data 学生信息的csv字符串表示
 * @return {Array[Object]} 学生信息
 */
function studentDataParserFromCsv(data) {
    let students = [];
    // assert(data, "Input text must be not empty");
    try {
        data.split('\n').forEach((item)=> {
            students.push(getStudentItem(item));
        });
    } catch (err) {
        return [];
        throw "文本输入格式有误!";
    }
    return students;
}
export default course;
export {
  studentDataParserFromCsv
};