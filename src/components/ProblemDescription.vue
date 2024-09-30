<template>
  <v-container>
    <h2>Describe Your Problem</h2>
    <v-textarea
      v-model="problemDescription"
      label="Problem Description"
      placeholder="Please describe the issue you're facing..."
      rows="5"
      variant="solo-filled"
      clearable
    ></v-textarea>

    <v-btn color="primary" class="mt-4" @click="submitDescription"
      >Submit</v-btn
    >
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
