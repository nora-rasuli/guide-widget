<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card-title>
        <h2 class="text-h5">Admin Customization</h2>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <!-- Header Color Picker -->
        <v-row align="center" class="mb-4">
          <v-col cols="12">
            <!-- Hidden Color Picker Dialog -->
            <v-color-picker
              label="Select Header Color"
              v-model="headerColor"
              variant="solo"
            ></v-color-picker>
          </v-col>
        </v-row>

        <!-- Font Size Selector -->
        <v-row align="center" class="mb-4">
          <v-col cols="12">
            <v-text-field
              label="Font Size"
              v-model="fontSize"
              type="number"
              min="12"
              max="36"
              variant="solo"
              prepend-icon="mdi-format-size"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Font Family Selector -->
        <v-row align="center" class="mb-4">
          <v-col cols="12">
            <v-select
              v-model="fontFamily"
              :items="fontFamilies"
              label="Select Font Family"
              variant="solo"
              prepend-icon="mdi-format-font"
            ></v-select>
          </v-col>
        </v-row>

        <!-- Logo Uploader -->
        <v-row align="center" class="mb-4">
          <v-col cols="12">
            <v-file-input
              label="Upload Logo"
              v-model="logoFile"
              accept="image/*"
              @change="convertToBase64"
              clearable
              prepend-icon="mdi-image"
              variant="solo"
            ></v-file-input>
          </v-col>
        </v-row>

        <!-- Logo Preview -->
        <v-row justify="center" align="center" class="mb-4" v-if="logo">
          <v-col cols="12" class="text-center">
            <h3 class="text-h6 mb-3">Current Logo</h3>
            <v-img
              :src="logo"
              max-width="150"
              max-height="150"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>

        <!-- Save Button -->
        <v-row align="center" class="mb-4">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn color="primary" class="mr-4" @click="saveSettings">
              Save Changes
            </v-btn>
            <v-btn color="secondary" @click="goToMain"> Go to Widget </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AdminCustomization",
  data() {
    return {
      headerColor: this.$store.state.customization.headerColor || "#3498db",
      fontSize: this.$store.state.customization.fontSize || "16",
      fontFamily: this.$store.state.customization.fontFamily || "Arial",
      logo: this.$store.state.customization.logo || null,
      logoFile: null,
      fontFamilies: [
        "Arial",
        "Helvetica",
        "Georgia",
        "Courier",
        "Times New Roman",
      ],
      showColorPicker: false,
    };
  },
  methods: {
    convertToBase64() {
      if (this.logoFile) {
        const file = this.logoFile;
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          this.logo = reader.result;
        };
      }
    },
    saveSettings() {
      // Commit the changes to the Vuex store
      this.$store.commit("setCustomization", {
        headerColor: this.headerColor,
        fontSize: this.fontSize,
        fontFamily: this.fontFamily,
        logo: this.logo,
      });
    },
    goToMain() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.v-file-input {
  margin-bottom: 20px;
}
.v-btn {
  min-width: 150px;
}
/* Center the current logo */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.v-color-picker {
  width: auto !important;
  max-width: 100% !important;
}
</style>
