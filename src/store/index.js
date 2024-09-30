import { createStore } from "vuex";
import {
  getInitialQuestion,
  getFollowUpQuestions,
  getSolution,
} from "@/services/api";

export default createStore({
  state: {
    problemDescription: localStorage.getItem("problemDescription") || "",
    userAnswers: JSON.parse(localStorage.getItem("userAnswers")) || [],
    feedback: JSON.parse(localStorage.getItem("feedback")) || null,
    customization: JSON.parse(localStorage.getItem("customization")) || {
      headerColor: "#dfe9fd",
      fontSize: "16",
      fontFamily: "Arial",
      logo: null,
    },
    currentQuestion: null,
    followUpQuestions: [],
    answers: {}, // Stores user's answers
    solution: null, // Stores the solution after answering questions
  },
  mutations: {
    setProblemDescription(state, description) {
      state.problemDescription = description;
      localStorage.setItem("problemDescription", description);
    },
    setUserAnswers(state, answers) {
      state.userAnswers = answers;
      localStorage.setItem("userAnswers", JSON.stringify(answers));
    },
    setFeedback(state, feedback) {
      state.feedback = feedback;
      localStorage.setItem("feedback", JSON.stringify(feedback));
    },
    setCustomization(state, customization) {
      state.customization = customization;
      localStorage.setItem("customization", JSON.stringify(customization));
    },
    setCurrentQuestion(state, question) {
      state.currentQuestion = question;
    },
    setFollowUpQuestions(state, questions) {
      state.followUpQuestions = questions;
    },
    setAnswer(state, { questionId, answer }) {
      state.answers[questionId] = answer; // Store the user's answer with the question ID
    },
    setSolution(state, solution) {
      state.solution = solution;
    },
  },
  actions: {
    fetchInitialQuestion({ commit }) {
      return getInitialQuestion().then((question) => {
        commit("setCurrentQuestion", question);
      });
    },
    fetchFollowUpQuestions({ commit }) {
      return getFollowUpQuestions().then((questions) => {
        commit("setFollowUpQuestions", questions);
      });
    },
    fetchSolution({ commit }, answer) {
      return getSolution(answer).then((solution) => {
        commit("setSolution", solution);
      });
    },
  },
});
