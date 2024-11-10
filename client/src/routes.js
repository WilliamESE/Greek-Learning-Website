import Home from './components/home/home'
import Login from './components/Login/login';
import Admin from './components/admin/admin';

const routes =[
    {
        type: "collapse",
        name: "Home",
        key: "home",
        route: "/home",
        component: <Home />,
        children: [],
        completed_sets: 0,
        total_sets: 0,
        sets: false,
        admin: false,
        icon: "homeIcon.png"
    },
    {
        type: "collapse",
        name: "Alphabet",
        key: "alphabet",
        route: "/alphabet",
        component: <Home />,
        completed_sets: 0,
        total_sets: 1,
        sets: true,
        admin: false,
        icon: "alphIcon.PNG",
        children: [
            {
                name: "Lessons",
                key: "lessons",
                component: <Home />,
                route: "/alphabet/lessons",
                icon: "lessonIcon.png"
            },
            {
                name: "Activites",
                key: "activites",
                component: <Home />,
                route: "/alphabet/activites",
                icon: "activityIcon.png"
            }
        ]
    },
    {
        type: "collapse",
        name: "Vocabulary",
        key: "vocab",
        route: "/vocab",
        component: <Home />,
        completed_sets: 0,
        total_sets: 10,
        sets: true,
        admin: false,
        icon: "wordIcon.png",
        children: [
            {
                name: "Lessons",
                key: "lessons",
                component: <Home />,
                route: "/vocab/lessons",
                icon: "lessonIcon.png"
            },
            {
                name: "Activites",
                key: "activites",
                component: <Home />,
                route: "/vocab/activites",
                icon: "activityIcon.png"
            }
        ]
    },
    {
        type: "collapse",
        name: "Sentences",
        key: "sent",
        route: "/sent",
        component: <Home />,
        completed_sets: 0,
        total_sets: 10,
        sets: true,
        admin: false,
        icon: "sentenceIcon.png",
        children: [
            {
                name: "Lessons",
                key: "lessons",
                component: <Home />,
                route: "/sent/lessons",
                icon: "lessonIcon.png"
            },
            {
                name: "Activites",
                key: "activites",
                component: <Home />,
                route: "/sent/activites",
                icon: "activityIcon.png"
            }
        ]
    },
    {
        type: "collapse",
        name: "Tenses",
        key: "tense",
        route: "/tense",
        component: <Home />,
        completed_sets: 0,
        total_sets: 10,
        sets: true,
        admin: false,
        icon: "tensesIcon.png",
        children: [
            {
                name: "Lessons",
                key: "lessons",
                component: <Home />,
                route: "/tense/lessons",
                icon: "lessonIcon.png"
            },
            {
                name: "Activites",
                key: "activites",
                component: <Home />,
                route: "/tense/activites",
                icon: "activityIcon.png"
            }
        ]
    },
    {
        type: "collapse",
        name: "Reading",
        key: "read",
        route: "/read",
        component: <Home />,
        completed_sets: 0,
        total_sets: 10,
        sets: true,
        admin: false,
        icon: "readingIcon.png",
        children: []
    },
    {
        type: "collapse",
        name: "Writing",
        key: "write",
        route: "/write",
        component: <Home />,
        completed_sets: 0,
        total_sets: 0,
        sets: false,
        admin: false,
        icon: "writingIcon.png",
        children: [
            {
                name: "Lessons",
                key: "lessons",
                component: <Home />,
                route: "/write/lessons",
                icon: "lessonIcon.png"
            },
            {
                name: "Activites",
                key: "activites",
                component: <Home />,
                route: "/write/activites",
                icon: "activityIcon.png"
            }
        ]
    },
    {
        type: "collapse",
        name: "Preferences",
        key: "preferences",
        route: "/preferences",
        component: <Home />,
        children: [],
        completed_sets: 0,
        total_sets: 0,
        bottom: true,
        sets: false,
        admin: false,
        icon: "settingIcon.png"
    },
    {
        type: "collapse",
        name: "Admin",
        key: "admin",
        route: "/admin",
        component: <Admin />,
        completed_sets: 0,
        total_sets: 0,
        bottom: true,
        sets: false,
        admin: true,
        icon: "adminIcon.png",
        children: [
            {
                name: "Analytics",
                key: "analytics",
                component: <Admin />,
                route: "/admin/analytics",
                icon: "analyticsIcon.png"
            },
            {
                name: "Add Lessons",
                key: "addlessons",
                component: <Admin />,
                route: "/admin/addlessons",
                icon: "addLessonIcon.png"
            },
            {
                name: "Add Activites",
                key: "addactivites",
                component: <Admin />,
                route: "/admin/addactivites",
                icon: "addActivityIcon.png"
            }
        ]
    }
];

export default routes;