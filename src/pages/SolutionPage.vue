<template>
  <v-container>
    <h2>Solution to your problem</h2>

    <!-- Display the answer summary -->
    <v-card class="mb-4">
      <v-card-title>Your answers</v-card-title>
      <v-card-text
        ><ul>
          <li v-for="(answer, index) in userAnswers" :key="index">
            {{ answer }}
          </li>
        </ul></v-card-text
      >
    </v-card>

    <!-- Display a solution -->
    <v-card>
      <v-card-title>Our suggested Solution</v-card-title>
      <v-card-text>
        Based on your answers, we suggest the following solution:
        <ul>
          <li v-if="userAnswers[0] === 'Red'">
            Try focusing on calming activities to balance the intensity of your
            choice.
          </li>
          <li v-if="userAnswers[1] === 'Banana'">
            You seem to like healthy choices! Keep it up!
          </li>
          <li v-if="userAnswers[2]">
            Plan a vacation to {{ userAnswers[2] }}!
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <!-- Feedback form at the bottom of the solution -->
    <FeedbackForm />
    <v-btn color="primary" class="mt-4" @click="goBack"
      >Back to Questions</v-btn
    >
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
    ...mapState(["userAnswers"]), // Map the state from Vuex to get user answers
  },
  methods: {
    goBack() {
      this.$router.push("/questions"); // Navigate back to questions
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
</style>
