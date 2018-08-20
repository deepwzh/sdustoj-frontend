import React from 'react';
import { BlankLayout, MainPageLayout, MenuSiderBarLayout } from "./layouts";
import LoginPage from "./pages/LoginPage";
import CourseList from './containers/CourseListContainer';
import MainPage from './pages/MainPage';
import MissionPage from './pages/MissionPage';
import ProblemPage from './pages/ProblemPage';
import SubmissionPage from './pages/SubmissionPage';
import StatusPage from './pages/StatusPage';
import CourseInstanceContainer from './containers/CourseInstanceContainer';
import MissionContainer from './containers/MissionContainer/MissionContainer';
import LessonInfo from './pages/CourseListPage/LessonInfo'

import TeacherTable from './pages/CourseInstancePage/TeacherTable'
import GroupInTable from './pages/CourseInstancePage/GroupInTable'
const routers = [
    {
        path: '/',
        component: MainPage,
        layout: MainPageLayout
    }, {
        path: '/login',
        component: LoginPage,
        layout: BlankLayout
    }, {
        path: '/course',
        component: CourseList,
        layout: MainPageLayout
    }, {
        path: '/course/:course_id',
        component: CourseInstanceContainer,
        layout: MenuSiderBarLayout,
    }, {
        path: '/course/:course_id/course_info',
        component: LessonInfo,
        layout: MenuSiderBarLayout,
    }, {    // 添加 teacher 表   18-08-16
        path: '/course/:course_id/teacher',
        component: TeacherTable,
        layout: MenuSiderBarLayout,
    }, {    // 添加 course_group 表   18-08-16
        path: '/course/:course_id/course_group',
        component: GroupInTable,
        layout: MenuSiderBarLayout,
    }, {
        path: '/course/:course_id/mission_group/:mission_group_id',
        component: CourseInstanceContainer,
        layout: MenuSiderBarLayout,
    }, {
        path: '/course/:course_id/mission_group/:mission_group_id/mission/:mission_id',
        component: MissionContainer,
        layout: MenuSiderBarLayout,
    }, {
        path: '/course/:course_id/mission/:mission_id/problem/:problem_id',
        component: ProblemPage,
        layout: MainPageLayout
    }, {
        path: '/course/:course_id/mission/:mission_id/submission',
        component: SubmissionPage,
        layout: MainPageLayout
    }, {
        path: '/status',
        component: StatusPage,
        layout: MainPageLayout
    }, {
        path: 'account',
        component: <h1>hello world</h1>,
        layout: MainPageLayout
    }
];
export default routers;