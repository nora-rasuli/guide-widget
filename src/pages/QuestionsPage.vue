<template>
  <v-container>
    <v-form ref="questionForm" v-model="valid" lazy-validation>
      <h2 v-if="currentQuestion">{{ currentQuestion.question }}</h2>

      <!-- Show the first question: Instrument Cluster Powered -->
      <div v-if="currentQuestion && currentQuestion.type === 'radio'">
        <v-radio-group
          v-model="answers['Instrument Cluster Powered']"
          @change="handleInitialAnswer"
          :rules="[required]"
        >
          <v-radio
            v-for="option in currentQuestion.options"
            :key="option"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>
      </div>

      <!-- Conditionally show follow-up questions only if the answer to the first question is "Yes" -->
      <div
        v-if="
          answers['Instrument Cluster Powered'] === 'Yes' &&
          followUpQuestions.length > 0
        "
      >
        <v-card
          v-for="(question, index) in followUpQuestions"
          :key="index"
          class="mb-4"
        >
          <v-card-title class="question-title">{{
            question.question
          }}</v-card-title>

          <!-- Text input for VIN -->
          <v-card-text>
            <v-text-field
              v-if="question.type === 'text'"
              v-model="answers.VIN"
              placeholder="Enter your VIN"
              :rules="[required]"
              variant="solo-filled"
            ></v-text-field>
          </v-card-text>

          <!-- Numerical input for car year -->
          <v-card-text v-if="question.type === 'number'">
            <v-text-field
              v-model="answers['Car Year']"
              type="number"
              placeholder="Enter car year"
              :rules="[required, numberRule]"
              variant="solo-filled"
            ></v-text-field>
          </v-card-text>

          <!-- Image choice for dashboard lights -->
          <v-card-text v-if="question.type === 'image'">
            <!-- Using v-radio-group for image selection to leverage Vuetify validation -->
            <v-radio-group
              v-model="answers['Warning Lights']"
              :rules="[required]"
              required
            >
              <ol class="image-list">
                <v-row>
                  <v-col
                    cols="6"
                    v-for="(option, index) in question.options"
                    :key="index"
                  >
                    <li class="image-list-item">
                      <v-img
                        :src="getImage(option.src)"
                        :alt="option.alt"
                        :class="{
                          'selected-image':
                            answers['Warning Lights'] === option.alt,
                        }"
                        @click="selectImage('Warning Lights', option.alt)"
                        max-width="150"
                        max-height="150"
                      ></v-img>
                    </li>
                  </v-col>
                </v-row>
              </ol>
            </v-radio-group>
          </v-card-text>
        </v-card>

        <!-- Submit button -->
        <v-btn color="primary" @click="validateAndSubmit">Submit Answers</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      valid: false, // To track the form's validity
      showWarning: false, // Control warning visibility
      required: (v) => !!v || "This field is required", // Required validation rule
      numberRule: (v) =>
        !v || /^[0-9]+$/.test(v) || "This field must be a valid number", // Validation for numbers
    };
  },
  computed: {
    ...mapState({
      currentQuestion: (state) => state.currentQuestion,
      followUpQuestions: (state) => state.followUpQuestions,
      solution: (state) => state.solution,
      answers: (state) => state.answers, // Use answers from Vuex
    }),
  },
  methods: {
    ...mapActions([
      "fetchInitialQuestion",
      "fetchFollowUpQuestions",
      "fetchSolution",
    ]),

    // Handle the initial question (Instrument Cluster Powered)
    handleInitialAnswer() {
      const answer = this.answers["Instrument Cluster Powered"];

      if (answer === "No") {
        // Clear the follow-up answers since they are no longer relevant
        this.clearFollowUpAnswers();

        // Save the "No" answer and go directly to the solution
        this.$store.commit("setAnswer", {
          questionId: "Instrument Cluster Powered",
          answer: "No",
        });
        this.fetchSolution("No").then(() => {
          this.$router.push("/solution");
        });
      } else if (answer === "Yes") {
        // Save the "Yes" answer and proceed with follow-up questions
        this.$store.commit("setAnswer", {
          questionId: "Instrument Cluster Powered",
          answer: "Yes",
        });
        this.fetchFollowUpQuestions(); // Fetch and show follow-up questions
      }
    },

    // Clear follow-up answers when the user selects "No"
    clearFollowUpAnswers() {
      this.$store.commit("removeAnswer", "VIN");
      this.$store.commit("removeAnswer", "Car Year");
      this.$store.commit("removeAnswer", "Warning Lights");
    },

    selectImage(questionId, imageAlt) {
      this.$store.commit("setAnswer", { questionId, answer: imageAlt });
      // Set the selected image value in v-model so validation works
      this.answers[questionId] = imageAlt;
    },

    async validateAndSubmit() {
      // Validate the form using Vuetify's validation
      const { valid } = await this.$refs.questionForm.validate();

      if (valid) {
        // If the form is valid, proceed to submit the answers
        this.$store.commit("setAnswer", {
          questionId: "VIN",
          answer: this.answers.VIN,
        });
        this.$store.commit("setAnswer", {
          questionId: "Car Year",
          answer: this.answers["Car Year"],
        });
        this.$store.commit("setAnswer", {
          questionId: "Warning Lights",
          answer: this.answers["Warning Lights"],
        });

        // Fetch solution and go to the solution page
        this.fetchSolution(this.answers["Warning Lights"]).then(() => {
          this.$router.push("/solution"); // Only navigate if form is valid
        });
      } else {
        // Show a warning if form is invalid
        this.showWarning = true;
      }
    },

    getImage(fileName) {
      return require(`@/assets/images/${fileName}`);
    },

    prefillAnswer() {
      const editQuestion = this.$route.query.edit;
      if (editQuestion && this.answers[editQuestion]) {
        this.$store.commit("setAnswer", {
          questionId: editQuestion,
          answer: this.answers[editQuestion],
        });
      }
    },
  },
  mounted() {
    this.fetchInitialQuestion();
    this.prefillAnswer(); // Pre-fill if editing
  },
};
</script>

<style scoped>
.selected-image {
  border: 4px solid #3498db;
}

.question-title {
  white-space: normal; /* Allow wrapping */
  word-wrap: break-word; /* Ensure long words break correctly */
  overflow-wrap: break-word; /* Make sure words don't overflow */
}
</style>
