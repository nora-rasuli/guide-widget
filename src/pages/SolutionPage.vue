<template>
  <v-container>
    <!-- Display the answer summary -->
    <v-card class="mb-4">
      <v-card-title>Your answers</v-card-title>
      <v-card-text
        ><ul>
          <li
            v-for="(answer, questionId) in userAnswers"
            :key="questionId"
            class="answer-item"
          >
            {{ questionId }}: {{ answer }}
            <v-btn
              small
              class="edit-btn"
              variant="outlined"
              @click="editAnswer(questionId)"
              >Edit</v-btn
            >
          </li>
        </ul></v-card-text
      >
    </v-card>

    <!-- Display the solution fetched from Vuex -->
    <v-card v-if="solution">
      <v-card-title>Solution</v-card-title>
      <v-card-text>
        {{ solution.solution }}
      </v-card-text>
    </v-card>
    <!-- Feedback form at the bottom of the solution -->
    <FeedbackForm />
  </v-container>
</template>

<script>
import FeedbackForm from "@/components/FeedbackForm.vue"; // Import FeedbackForm
import { mapState } from "vuex";
export default {
  name: "SolutionPage",
  components: {
    FeedbackForm,
  },

  computed: {
    ...mapState({
      userAnswers: (state) => state.answers, // Map user's answers from Vuex state
      solution: (state) => state.solution, // Map solution from Vuex state
    }),
  },
  methods: {
    editAnswer(questionId) {
      // Navigate to the question page and pass the question ID to allow editing
      this.$router.push({
        path: "/questions",
        query: { highlight: questionId }, // Pass the questionId to highlight
      });
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
}

.mb-4 {
  margin-bottom: 16px;
}
.answer-item {
  display: flex;
  justify-content: space-between; /* Ensures space between the answer and the edit button */
  align-items: center; /* Vertically center the items */
  padding: 8px 0; /* Add padding for spacing */
}

/* Edit button aligned to the right */
.edit-btn {
  margin-left: auto; /* Push the button to the right */
  color: #333; /* Dark gray text */
}
</style>
