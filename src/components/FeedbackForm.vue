<template>
  <v-card class="mt-4">
    <v-card-title>Was this solution helpful?</v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-col cols="6" md="3">
          <v-btn
            color="success"
            large
            @click="submitFeedback(true)"
            :disabled="feedbackSubmitted"
          >
            <v-icon left>mdi-thumb-up</v-icon> Yes
          </v-btn>
        </v-col>

        <v-col cols="6" md="3">
          <v-btn
            color="error"
            large
            @click="submitFeedback(false)"
            :disabled="feedbackSubmitted"
          >
            <v-icon left>mdi-thumb-down</v-icon> No
          </v-btn>
        </v-col>
      </v-row>

      <div v-if="feedbackSubmitted" class="mt-4">
        <v-alert type="success" v-if="feedback === true">
          Thank you for your feedback! We're glad the solution helped.
        </v-alert>
        <v-alert type="error" v-if="feedback === false">
          We're sorry the solution wasn't helpful. We'll strive to improve. In
          the mean-time you can contact our exerts at (666)-666-666
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "FeedbackForm",
  data() {
    return {
      feedback: null,
      feedbackSubmitted: false,
    };
  },
  methods: {
    submitFeedback(isHelpful) {
      this.feedback = isHelpful;
      this.feedbackSubmitted = true;
      this.$store.commit("setFeedback", this.feedback); // Save feedback to Vuex

      console.log("Feedback submitted:", isHelpful ? "Helpful" : "Not Helpful");
    },
  },
};
</script>

<style scoped>
.mt-4 {
  margin-top: 16px;
}
</style>
