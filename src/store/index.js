import { createStore } from "vuex";

export default createStore({
  state: {
    problemDescription: localStorage.getItem("problemDescription") || "",
    userAnswers: JSON.parse(localStorage.getItem("userAnswers")) || [],
    feedback: JSON.parse(localStorage.getItem("feedback")) || null,
    customization: JSON.parse(localStorage.getItem("customization")) || {
      headerColor: "#3498db",
      fontSize: "16",
      fontFamily: "Arial",
      logo: null,
    },
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
  },
});
