<template>
  <v-container>
    <h2>Answer the Questions</h2>

    <!-- Multiple-choice questions -->
    <v-card v-for="(question, index) in questions" :key="index" class="mb-4">
      <v-card-title>{{ question.prompt }}</v-card-title>

      <!-- Multiple-choice question layout -->
      <v-card-text v-if="question.type === 'multiple-choice'">
        <v-radio-group v-model="selectedAnswers[index]" column>
          <v-radio
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>
      </v-card-text>

      <!-- Image-based question layout: 2 images per row -->
      <v-card-text v-if="question.type === 'image-choice'">
        <v-row>
          <v-col
            v-for="(image, imageIndex) in question.images"
            :key="imageIndex"
            cols="12"
            md="6"
          >
            <v-img
              :src="image.src"
              :alt="image.alt"
              class="image-choice"
              :class="{
                'selected-image': selectedAnswers[index] === image.src,
              }"
              @click="selectImage(index, image.src)"
              max-height="200"
              max-width="200"
              contain
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Free-text question layout -->
      <v-card-text v-if="question.type === 'free-text'">
        <v-textarea
          v-model="selectedAnswers[index]"
          label="Your answer"
          placeholder="Type your answer here..."
          rows="3"
          outlined
        ></v-textarea>
      </v-card-text>
    </v-card>

    <!-- Submit button -->
    <v-btn color="primary" @click="goToSolution">Submit Answers</v-btn>

    <div v-if="submitted" class="mt-4">
      <h3>Your Answers:</h3>
      <ul>
        <li v-for="(answer, index) in selectedAnswers" :key="index">
          {{ answer }}
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "QuestionsPage",
  data() {
    return {
      questions: [
        {
          type: "multiple-choice",
          prompt: "What is your favorite color?",
          options: ["Red", "Blue", "Green", "Yellow"],
        },
        {
          type: "image-choice",
          prompt: "Select your favorite fruit:",
          images: [
            { src: require("@/assets/engine1.jpg"), alt: "Apple" },
            { src: require("@/assets/engine2.jpg"), alt: "Banana" },
            { src: require("@/assets/engine3.jpg"), alt: "Cherry" },
            { src: require("@/assets/engine4.jpg"), alt: "Grape" },
          ],
        },
        {
          type: "free-text",
          prompt: "Describe your ideal vacation destination:",
        },
      ],
      selectedAnswers: ["", "", ""],
      submitted: false,
    };
  },
  methods: {
    selectImage(questionIndex, imageSrc) {
      this.selectedAnswers[questionIndex] = imageSrc;
    },
    goToSolution() {
      this.$store.commit("setUserAnswers", this.selectedAnswers); // Save answers to Vuex

      this.$router.push({
        path: "/solution",
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

.image-choice {
  width: 200px; /* Set the width */
  height: 200px; /* Set the height */
  cursor: pointer;
  transition: border 0.3s ease;
}

.image-choice:hover {
  border: 2px solid #3498db;
}

.selected-image {
  border: 4px solid #3498db;
}
</style>
