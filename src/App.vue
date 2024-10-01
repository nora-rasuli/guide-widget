<template>
  <div
    class="widget-wrapper"
    :style="{
      backgroundColor: headerColor,
      height: minimized ? '64px' : 'auto',
    }"
  >
    <v-card
      :style="{
        '--font-size': fontSize + 'px',
        '--font-family': fontFamily,
        backgroundColor: headerColor,
        color: '#333' /* Ensure all text is dark gray (#333) */,
      }"
      elevation="4"
    >
      <v-toolbar :style="{ backgroundColor: headerColor }">
        <v-icon @click="goToAdmin" class="settings-icon"> mdi-cog </v-icon>

        <v-toolbar-title>Car Guide</v-toolbar-title>

        <v-spacer></v-spacer>
        <div class="logo-minimize-wrapper">
          <v-img
            v-if="logo"
            :src="logo"
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
  width: 45vw;
  max-height: 90vh; /* Ensure the widget height doesn't exceed 90% of the viewport */
  overflow: auto; /* Allow content to scroll if it exceeds the max height */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0;
}
.min-height {
  min-height: 31vh;
}
.v-card {
  width: 100%;
  max-width: 100%;
  background-color: inherit;
  color: #333; /* Dark gray text */
}

.v-card-text {
  overflow-y: auto;
}

/* Flexbox header to align title, logo, and minimize button */
.header-with-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  background-color: inherit; /* Use the dynamic background color */
}

/* Ensure the title is aligned on the left */
.header-with-logo .title {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
}

/* Container for logo and minimize button on the right */
.header-buttons {
  display: flex;
  align-items: center;
}

/* Ensure the logo is placed correctly */
.logo-right {
  margin-left: 8px;
  max-width: 40px;
  max-height: 40px;
}

/* Minimize icon button styling without background */
.minimize-icon {
  margin-left: 8px;
  font-size: 24px;
  color: #333; /* Dark gray icon */
  cursor: pointer;
  background-color: transparent; /* Remove background */
  border: none; /* Remove any border */
  outline: none; /* Remove focus outline */
  align-self: center;
}
.settings-icon {
  margin-left: 8px;
  font-size: 24px;
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

.minimize-btn {
  margin-left: 0; /* Ensure the minimize button is close to the logo */
}

.minimize-icon {
  color: white; /* Ensure icon contrast with header color */
}

.v-card {
  background-color: var(--header-color) !important;
  color: "#333"; /* Ensure text contrasts with the background */
  box-shadow: none !important;
}
.v-field input {
  background-color: #f7f7f7;
  box-shadow: none;
}
</style>
