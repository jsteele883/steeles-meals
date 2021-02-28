import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RecipeDetails from "@/components/RecipeDetails.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/recipe-details",
    name: "recipe-details",
    component: RecipeDetails
  }
];

const router = new VueRouter({
  routes
});

export default router;
