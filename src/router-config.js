import React from 'react';
import { BlankLayout, MainPageLayout } from "./layouts";
import LoginPage from "./pages/LoginPage";
import LessonPage from './pages/LessonPage';
import LessonDetailPage from './pages/LessonPage/LessonDetailPage';
import MainPage from './pages/MainPage';
import MissionPage from './pages/MissionPage';
import ProblemPage from './pages/ProblemPage';
import SubmissionPage from './pages/SubmissionPage';
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
        component: LessonPage,
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
    }, {
        path: '/lesson/:id/mission/:mission_id/problem/:problem_id',
        component: ProblemPage,
        layout: MainPageLayout
    }, {
        path: '/lesson/:id/mission/:mission_id/submission',
        component: SubmissionPage,
        layout: MainPageLayout
    }
];
export default routers;