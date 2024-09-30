import questionsData from "@/data/questions.json";

// Simulate fetching the initial question
export function getInitialQuestion() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(questionsData.initialQuestion), 500);
  });
}

// Simulate fetching follow-up questions if instrument cluster is powered
export function getFollowUpQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(questionsData.followUpQuestions), 500);
  });
}

// Simulate fetching solutions based on the answers
export function getSolution(answer) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (answer === "No") {
        resolve(questionsData.solutions.noPower);
      } else if (answer === "Engine Light") {
        resolve(questionsData.solutions.engineLight);
      } else if (answer === "Battery Light") {
        resolve(questionsData.solutions.batteryLight);
      } else if (answer === "Oil Light") {
        resolve(questionsData.solutions.oilLight);
      } else if (answer === "Coolant Light") {
        resolve(questionsData.solutions.coolantLight);
      } else {
        resolve({ solution: "No solution found for your answer." });
      }
    }, 500);
  });
}
