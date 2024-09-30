<template>
  <v-container>
    <h2>Admin Customization</h2>

    <!-- Header Color Picker -->
    <v-color-picker
      v-model="headerColor"
      hide-canvas
      variant="solo-filled"
    ></v-color-picker>

    <!-- Font Size Selector -->
    <v-text-field
      label="Font Size"
      v-model="fontSize"
      type="number"
      min="12"
      max="36"
      variant="solo-filled"
    ></v-text-field>

    <!-- Font Family Selector -->
    <v-select
      v-model="fontFamily"
      :items="fontFamilies"
      label="Select Font Family"
      variant="solo-filled"
    ></v-select>

    <!-- Logo Uploader -->
    <v-file-input
      label="Upload Logo"
      v-model="logoFile"
      accept="image/*"
      @change="convertToBase64"
      clearable
      variant="solo-filled"
    ></v-file-input>

    <div v-if="logo">
      <h3>Current Logo</h3>
      <v-img :src="logo" max-width="150" max-height="150"></v-img>
    </div>

    <v-btn color="primary" class="mt-4" @click="saveSettings"
      >Save Changes</v-btn
    >
    <v-btn color="primary" class="mt-4" @click="goToMain">Go to Widget </v-btn>
  </v-container>
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
}
</style>
