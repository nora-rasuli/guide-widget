<template>
  <v-container>
    <v-form ref="problemForm" v-model="valid" lazy-validation>
      <h2>Describe Your Car Problem</h2>
      <v-textarea
        v-model="problemDescription"
        label="Problem Description"
        placeholder="Please describe the issue you're facing with your car..."
        rows="5"
        variant="solo-filled"
        clearable
        counter
        class="mt-2"
        :rules="[required]"
      ></v-textarea>

      <v-btn color="primary" class="mt-4" @click="submitDescription"
        >Submit</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "ProblemDescription",
  data() {
    return {
      problemDescription: "", // Let the user input the description
      required: (v) => !!v || "This field is required", // Required validation rule
    };
  },
  methods: {
    async submitDescription() {
      // Validate the form without assigning `valid`
      if (await this.$refs.problemForm.validate()) {
        // If the description is exactly "My car is broken."
        if (this.problemDescription === "My car is broken.") {
          this.$store.commit("setProblemDescription", this.problemDescription);
          this.$router.push("/questions"); // Navigate to the Questions page
        }
        // If the description is different, show the error message and route to SolutionPage
        else {
          this.$store.commit("setSolution", {
            solution: "Sorry, we can't help you with your problem!",
          });
          this.$router.push("/solution"); // Redirect to Solution page
        }
      }
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
}
.mt-4 {
  margin-top: 16px;
}
</style>
