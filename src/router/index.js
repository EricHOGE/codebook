import { createRouter, createWebHistory } from "vue-router";

import EditProfil from "../views/EditProfil.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Page2 from "../views/Page2.vue";

const routes = [
	{
		path: "/page2",
		name: "Page2",
		component: Page2,
	},
	{
		path: "/edit",
		name: "Edit",
		component: EditProfil,
	},
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/about",
		name: "about",
		component: AboutView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
