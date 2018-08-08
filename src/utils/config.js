const protocol = 'http';
const host = '192.168.130.249';
const prefix = 'JudgeOnline'
const port = '8008';
const API = {
    LOGIN: '/api/login/',
    LEARNING_COURSES_LIST: '/api/learning-courses/',
    COURSE_INSTANCE: (course_id) => `/api/courses/${course_id}/`,

    MISSION_GROUP_LIST: (course_id) => `/api/courses/${course_id}/mission-groups/`,
    MISSION_GROUP_INSTANCE: (mission_group_id) => ``,
    
    MISSION_LIST: (mission_group_id) => `/api/mission-groups/${mission_group_id}/missions/`,
    MISSION_INSTANCE: () => ``,
    CREATE_MISSION_INSTANCE: (mission_group_id) => `/api/mission-groups/${mission_group_id}/missions-direct/`,
    DELETE_MISSION_INSTANCE: (mission_group_id, mission_id) => `/api/mission-groups/${mission_group_id}/missions/${mission_id}/`,

    PROBLEM_INSTANCE: (mission_id) => `/api/missions/2/problems/`,
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
        [PERMISSION.UPDATE]: [ROLE.STUDENT],
        [PERMISSION.DELETE]: [ROLE.STUDENT],
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