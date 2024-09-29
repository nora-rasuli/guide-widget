<template>
  <v-app
    :style="{
      '--header-color': headerColor,
      '--font-size': fontSize + 'px',
      '--font-family': fontFamily,
    }"
  >
    <!-- App Bar with Header Color and Logo -->
    <v-app-bar :color="headerColor" dark>
      <v-toolbar-title>
        <v-img v-if="logo" :src="logo" alt="Logo" max-width="40" class="mr-2" />
        Widget Project
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app padless>
      <v-col class="text-center" cols="12">
        <span>© 2024 Widget Project</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState({
      headerColor: (state) => state.customization.headerColor, // Get header color from Vuex
      fontSize: (state) => state.customization.fontSize, // Get font size from Vuex
      fontFamily: (state) => state.customization.fontFamily, // Get font family from Vuex
      logo: (state) => state.customization.logo, // Get logo from Vuex
    }),
  },
};
</script>

<style>
:root {
  --header-color: #3498db;
  --font-size: 16px;
  --font-family: Arial, sans-serif;
}

body {
  font-size: var(--font-size);
  font-family: var(--font-family);
}

.v-application .primary {
  background-color: var(--header-color) !important;
}
</style>
