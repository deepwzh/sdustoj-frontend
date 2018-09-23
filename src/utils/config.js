const DEBUG = true;
const protocol = 'http';
const host = '127.0.0.1';
const prefix = 'JudgeOnline'
const port = '80';
if (DEBUG) {
    //
}

const API = {
    ANNOUNCEMENT_INSTANCE : (id) => `/api/announcement/${id}`,
    ANNOUNCEMENT_LIST: '/api/announcement',
    LOGIN: '/api/login/',
    LOGOUT: '/api/logout',
    ACCOUNT_PROFILE: '/api/account/profile/',
    ACCOUNT_PASSWORD: '/api/account/password/',
    LEARNING_COURSES_LIST: '/api/learning-courses/',
    TEACHING_COURSES_LIST: '/api/teaching-courses/',
    RANK_INSTANCE: (user_id) => `/api/missions/14/ranks/${user_id}/`,
    COURSE_INSTANCE: (course_id) => `/api/courses/${course_id}/`,
    COURSE_LIST: (course_meta_id) => `/api/course-metas/${course_meta_id}/courses/`,
    COURSE_META_LIST: (organization_id) => `/api/organizations/${organization_id}/course-metas/`,
    
    MISSION_GROUP_LIST: (course_id) => `/api/courses/${course_id}/mission-groups/`,
    MISSION_GROUP_INSTANCE: (mission_group_id) => `/api/mission-groups/${mission_group_id}/`,

    MISSION_LIST: (mission_group_id) => `/api/mission-groups/${mission_group_id}/missions/`,
    RUNNING_MISSION_LIST: (course_id) => `/api/courses/${course_id}/running-missions/`,
    MISSION_INSTANCE: (mission_id) => `/api/missions/${mission_id}/`,
    
    
    CREATE_MISSION_INSTANCE: (mission_group_id) => `/api/mission-groups/${mission_group_id}/missions-direct/`,
    DELETE_MISSION_INSTANCE: (mission_group_id, mission_id) => `/api/mission-groups/${mission_group_id}/missions/${mission_id}/`,
    UPDATE_MISSION_INSTANCE: (mission_group_id, mission_id) => `/api/mission-groups/${mission_group_id}/missions/${mission_id}/`,
    MISSION_STUDENT_LIST: (course_id) => `/api/courses/${course_id}/students/`,
    MISSION_STUDENT_INSTANCE: (course_id, id) => `/api/courses/${course_id}/students/${id}/`,
    PROBLEM_LIST: (mission_id) => `/api/missions/${mission_id}/problems/`,
    PROBLEM_INSTANCE: (mission_id, problem_id) => `/api/missions/${mission_id}/problems/${problem_id}/`,
    CREATE_MISSION_PROBLEM_INSTANCE: (mission_id) => `/api/missions/${mission_id}/problems/`,
    DELETE_MISSION_PROBLEM_INSTANCE: (mission_id, id) => `/api/missions/${mission_id}/problems/${id}/`,
    SUBMISSION_LIST: (mission_id, params) => `/api/missions/${mission_id}/submissions/?${params}`,

    AVAILABLE_PROBLEM: (mission_id) => `/api/missions/${mission_id}/available-problems/`,
    SUBMISSIONCODE: (submission_id) => `/api/submissioncode/${submission_id}`,


    // TMP API
    GLOBAL_PROBLEM_INSTANCE: (problem_id) => `/api/problem/${problem_id}`

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

/**
 * @description 判断某角色 对某资源（object）是否具有某权限（permission）
 */
let has_permission = (object, permission) => {
    const role = localStorage.getItem('role');
    if (PERMISSION_TABLE[object][permission].includes(role)) {
        return true;
    } else {
        return false;
    }
}

export {
    getAPIUrl,
    API,
    PERMISSION_TABLE,
    ROLE,
    PERMISSION,
    RESOURCE,
    has_permission
}