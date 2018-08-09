const DEBUG = true;
const protocol = 'http';
const host = '127.0.0.1';
const prefix = 'JudgeOnline'
const port = '80';
if (DEBUG) {
    //
}

const API = {
    LOGIN: '/api/login/',
    LEARNING_COURSES_LIST: '/api/learning-courses/',
    COURSE_INSTANCE: (course_id) => `/api/courses/${course_id}/`,

    MISSION_GROUP_LIST: (course_id) => `/api/courses/${course_id}/mission-groups/`,
    MISSION_GROUP_INSTANCE: (mission_group_id) => ``,
    
    MISSION_LIST: (mission_group_id) => `/api/mission-groups/${mission_group_id}/missions/`,
    MISSION_INSTANCE: (mission_id) => `/api/missions/${mission_id}/`,
    CREATE_MISSION_INSTANCE: (mission_group_id) => `/api/mission-groups/${mission_group_id}/missions-direct/`,
    DELETE_MISSION_INSTANCE: (mission_group_id, mission_id) => `/api/mission-groups/${mission_group_id}/missions/${mission_id}/`,

    PROBLEM_LIST: (mission_id) => `/api/missions/${mission_id}/problems/`,
    PROBLEM_INSTANCE: (mission_id, problem_id) => `/api/missions/${mission_id}/problems/${problem_id}/`,

    SUBMISSION_LIST: (mission_id) => `/api/missions/${mission_id}/submissions/`,



}
const PERMISSION = {
    CREATE: "CREATE",
    RETRIEVE: "RETRIEVE",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
}
const ROLE = {
    STUDENT: "STUDENT",
    TEACHER: "TEACHER",
    // OWNER: "OWNER",
}
const RESOURCE = {
    COURSE: "COURSE",
    MISSION_GROUP: "MISSION_GROUP",
    MISSION: "MISSION",
    PROBLEM: "PROBLEM",
    SUBMISSION: "SUBMISSION"
}
/**
 * 权限配置矩阵，针对每一个用户，每一个资源有CRUD四种权限
 */
const PERMISSION_TABLE = {
    [RESOURCE.COURSE]: {
        [PERMISSION.CREATE]:[ROLE.TEACHER],
        [PERMISSION.RETRIEVE]: [ROLE.TEACHER, ROLE.STUDENT],
        [PERMISSION.UPDATE]: [ROLE.TEACHER],
        [PERMISSION.DELETE]: [ROLE.TEACHER],
    },
    [RESOURCE.MISSION_GROUP]: {
        [PERMISSION.CREATE]: [ROLE.TEACHER],
        [PERMISSION.RETRIEVE]:[ROLE.TEACHER, ROLE.STUDENT],
        [PERMISSION.UPDATE]: [ROLE.TEACHER],
        [PERMISSION.DELETE]: [ROLE.TEACHER],
    },
    [RESOURCE.MISSION]: {
        [PERMISSION.CREATE]: [ROLE.TEACHER],
        [PERMISSION.RETRIEVE]:[ROLE.TEACHER, ROLE.STUDENT],
        [PERMISSION.UPDATE]:[ROLE.TEACHER],
        [PERMISSION.DELETE]:[ROLE.TEACHER],
    },
    [RESOURCE.PROBLEM]: {
        [PERMISSION.CREATE]: [ROLE.TEACHER],
        [PERMISSION.RETRIEVE]:[ROLE.TEACHER, ROLE.STUDENT],
        [PERMISSION.UPDATE]: [ROLE.TEACHER],
        [PERMISSION.DELETE]: [ROLE.TEACHER],
    },
    [RESOURCE.SUBMISSION]: {
        [PERMISSION.CREATE]: [ROLE.TEACHER, ROLE.STUDENT],
        [PERMISSION.RETRIEVE]: [ROLE.TEACHER, ROLE.STUDENT],
        [PERMISSION.UPDATE]: [ROLE.TEACHER],
        [PERMISSION.DELETE]: [ROLE.TEACHER],
    }
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
    API,
    PERMISSION_TABLE,
    ROLE,
    PERMISSION,
    RESOURCE
}