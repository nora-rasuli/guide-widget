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
      ></v-form
    >
  </v-container>
</template>

<script>
export default {
  name: "ProblemDescription",
  data() {
    return {
      valid: false, // To track the form's validity
      required: (v) => !!v || "This field is required", // Required validation rule

      problemDescription: "",
      submitted: false,
      showWarning: false,
    };
  },
  methods: {
    async submitDescription() {
      const { valid } = await this.$refs.problemForm.validate();

      if (valid) {
        this.submitted = true;
        this.$store.commit("setProblemDescription", this.setProblemDescription);
        this.$router.push("/questions"); // Navigate to Questions page
      } else {
        this.showWarning = true;
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
