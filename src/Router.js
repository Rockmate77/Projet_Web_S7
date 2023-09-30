import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from "@/pages/WelcomeView.vue";
import MainView from "@/pages/MainView.vue";
import AboutView from "@/pages/AboutView.vue";
import ContactView from "@/pages/ContactView.vue";

const routes = [
    { path: '/', component: WelcomeView },
    { path: '/about', component: AboutView },
    { path: '/contact', component: ContactView },
    { path: '/game', component: MainView },
    // Add more routes as needed
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;