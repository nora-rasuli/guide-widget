<template>
  <v-container>
    <h2>Describe Your Problem</h2>
    <v-textarea
      v-model="problemDescription"
      label="Problem Description"
      placeholder="Please describe the issue you're facing..."
      rows="5"
      outlined
    ></v-textarea>

    <v-btn color="primary" class="mt-4" @click="submitDescription"
      >Submit</v-btn
    >

    <div v-if="submitted" class="mt-4">
      <h3>Submitted Problem Description:</h3>
      <p>{{ problemDescription }}</p>
      <v-btn color="success" class="mt-4" @click="goToQuestions"
        >Proceed to Questions</v-btn
      >
      <!-- New Button -->
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ProblemDescription",
  data() {
    return {
      problemDescription: "",
      submitted: false,
    };
  },
  methods: {
    submitDescription() {
      this.submitted = true;
      this.$store.commit("setProblemDescription", this.setProblemDescription);
    },
    goToQuestions() {
      this.$router.push("/questions"); // Navigate to Questions page
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
}
.mt-4 {
  margin-top: 16px;
}
</style>
