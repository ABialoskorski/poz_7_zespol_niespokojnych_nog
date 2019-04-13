import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Products from "@/components/Products.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "products",
			component: Products,
		},
	],
});
