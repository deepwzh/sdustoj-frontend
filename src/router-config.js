import React from 'react';
import { BlankLayout, MainPageLayout } from "./layouts";
import LoginPage from "./pages/LoginPage";
import CourseList from './containers/CourseListContainer';
import LessonDetailPage from './pages/CourseListPage/LessonDetailPage';
import MainPage from './pages/MainPage';
import MissionPage from './pages/MissionPage';
import ProblemPage from './pages/ProblemPage';
import SubmissionPage from './pages/SubmissionPage';
import StatusPage from './pages/StatusPage';
import Overview from './pages/MissionPage/Overview'
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
        path: '/lesson',
        component: CourseList,
        layout: MainPageLayout
    }, {
        path: '/lesson/:id',
        component: LessonDetailPage,
        layout: MainPageLayout,
        routers: []
    }, {
        path: '/lesson/:id/mission/:mission_id',
        component: MissionPage,
        layout: MainPageLayout
    }, 

    // //TODO: 添 加任务下 其余路由选项
    // {   // overview
    //     path: '/lesson/:id/mission/:mission_id/overview',
    //     component: Overview,
    //     layout: MissionPage
    // }, {    // problem
    //     path: '/lesson/:id/mission/:mission_id/problem',
    //     component: null,
    //     layout: null
    // }, {    // status (想办法让其只展示自己的状态)
    //     path: '/lesson/:id/mission/:mission_id/status',
    //     component: null,
    //     layout: null
    // }, {    // rank
    //     path: '/lesson/:id/mission/:mission_id/rank',
    //     component: null,
    //     layout: null    
    // }, {
    //     path: '/lesson/:id/mission/:mission_id/other',
    //     component: null,
    //     layout: null
    // },

    {
        path: '/lesson/:id/mission/:mission_id/problem/:problem_id',
        component: ProblemPage,
        layout: MainPageLayout
    }, {
        path: '/lesson/:id/mission/:mission_id/submission',
        component: SubmissionPage,
        layout: MainPageLayout
    }, {
        path: '/status',
        component: StatusPage,
        layout: MainPageLayout
    }

];
export default routers;