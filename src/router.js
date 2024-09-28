import { createRouter, createWebHistory } from "vue-router";
import ProblemDescription from "./components/ProblemDescription.vue";
import QuestionsPage from "./pages/QuestionsPage.vue"; // Import the Questions component
import SolutionPage from "./pages/SolutionPage.vue"; // Import the solution page

const routes = [
  { path: "/", component: ProblemDescription }, // Set the default route
  { path: "/questions", component: QuestionsPage }, // Add route for Questions
  {
    path: "/solution",
    component: SolutionPage,
    props: (route) => ({ userAnswers: JSON.parse(route.query.answers) }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
