import { createRouter, createWebHistory } from "vue-router";
import ProblemDescription from "./components/ProblemDescription.vue";
import QuestionsPage from "./pages/QuestionsPage.vue"; // Import the Questions component
import SolutionPage from "./pages/SolutionPage.vue"; // Import the solution page
import AdminCustomization from "./pages/AdminCustomization.vue"; // Import AdminCustomization

const routes = [
  { path: "/", component: ProblemDescription }, // Set the default route
  { path: "/questions", component: QuestionsPage }, // Add route for Questions
  { path: "/solution", component: SolutionPage }, // Add route for Solutions
  { path: "/admin", component: AdminCustomization }, // Add route for admin customization
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
