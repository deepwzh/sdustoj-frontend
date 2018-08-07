const protocol = 'http';
const host = 'www.92ac.cn';
const prefix = 'JudgeOnline'
const port = '8008';
const API = {
    LOGIN: '/api/login/',
    LEARNING_COURSES_LIST: '/api/learning-courses/'
}
/**
 * 
 * @param {path} 去除端口号，主机名，协议名后的API地址，需要开头加/。  
 * 例: `/login`   
 * @return API地址
 */
function getAPIUrl(path) {
    return `${protocol}://${host}:${port}/${prefix}${path}`;
}
export {
    getAPIUrl,
    API
}