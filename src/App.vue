<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Widget Project</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid>
        <!-- Router View: Displays dynamic content based on the current route -->
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless>
      <v-col class="text-center" cols="12">
        <span>© 2024 Widget Project</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

v-main {
  flex-grow: 1;
}
</style>
