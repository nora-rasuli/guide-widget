<template>
  <div
    class="widget-wrapper"
    :style="{
      backgroundColor: headerColor,
      height: minimized ? '64px' : 'auto',
      '--font-size': fontSize + 'px',
      '--font-family': fontFamily,
    }"
  >
    <v-card elevation="4">
      <v-toolbar
        :style="{
          backgroundColor: headerColor,
        }"
      >
        <v-btn icon
          ><v-icon @click="goToAdmin" class="settings-icon">
            mdi-cog
          </v-icon></v-btn
        >

        <v-toolbar-title>Car Guide</v-toolbar-title>

        <v-spacer></v-spacer>
        <div class="logo-minimize-wrapper">
          <v-img
            :src="logo || require('@/assets/images/logo.png')"
            alt="Logo"
            width="40"
            height="40"
            class="logo-icon"
            contain
          />
        </div>
        <v-btn icon>
          <v-icon @click="toggleMinimize" class="minimize-icon">
            {{ minimized ? "mdi-arrow-expand" : "mdi-minus" }}
          </v-icon>
        </v-btn>
      </v-toolbar>
      <!-- Main content area (show only if not minimized) -->
      <v-card-text v-if="!minimized" class="min-height">
        <router-view />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      minimized: false, // Control whether the widget is minimized or not
    };
  },
  computed: {
    ...mapState({
      headerColor: (state) => state.customization.headerColor || "#3498db", // Default to Blue if not set
      fontSize: (state) => state.customization.fontSize, // Font size from Vuex
      fontFamily: (state) => state.customization.fontFamily, // Font family from Vuex
      logo: (state) => state.customization.logo, // Logo from Vuex
    }),
  },
  methods: {
    toggleMinimize() {
      this.minimized = !this.minimized; // Toggle the minimized state
    },
    goToAdmin() {
      this.$router.push("/admin"); // Navigate to the admin customization page
    },
  },
};
</script>

<style>
/* Global widget layout styles */
.widget-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  width: 40vw;
  max-height: 90vh; /* Ensure the widget height doesn't exceed 90% of the viewport */
  overflow: auto; /* Allow content to scroll if it exceeds the max height */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0;
}
.min-height {
  min-height: 31vh;
}

.v-card-text {
  overflow-y: auto;
}

/* Minimize icon button styling without background */
.minimize-icon {
  color: #333; /* Dark gray icon */
  cursor: pointer;
  background-color: transparent; /* Remove background */
  border: none; /* Remove any border */
  outline: none; /* Remove focus outline */
  align-self: center;
}
.settings-icon {
  color: #333; /* Dark gray icon */
  cursor: pointer;
  align-self: center;
}

.logo-minimize-wrapper {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 40px; /* Set logo width */
  height: 40px; /* Set logo height */
  margin-right: 8px; /* Reduce the space between the logo and minimize button */
}

.minimize-icon {
  color: white; /* Ensure icon contrast with header color */
}

.v-card {
  background-color: var(--header-color) !important;
  color: "#333"; /* Ensure text contrasts with the background */
  box-shadow: none !important;
  width: 100%;
  max-width: 100%;
  background-color: inherit;
  color: #333; /* Dark gray text */
}
.v-field input {
  background-color: #f7f7f7;
  box-shadow: none;
}

.widget-wrapper {
  font-size: var(--font-size) !important;
  font-family: var(--font-family) !important;
}

.widget-wrapper .v-card,
.v-card-text,
.v-card-title,
p {
  font-size: var(--font-size) !important;
  font-family: var(--font-family) !important;
}
</style>
