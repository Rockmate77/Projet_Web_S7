import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from "@/pages/WelcomeView.vue";
import MainView from "@/pages/MainView.vue";
import AboutView from "@/pages/AboutView.vue";
import ContactView from "@/pages/ContactView.vue";

const routes = [
    { path: '/', component: MainView },
    { path: '/about', component: AboutView },
    { path: '/contact', component: ContactView },
    { path: '/game', component: MainView },
    // Add more routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Define a navigation guard
router.beforeEach((to, from, next) => {
    // Check if the "uploadedfile" exists in session storage
    if (to.path !== '/' && !sessionStorage.getItem('uploadedfile')) {
        // If "uploadedfile" doesn't exist, redirect back to '/'
        next('/');
    } else {
        // If "uploadedfile" exists or the route is '/', allow navigation
        next();
    }
});

export default router;