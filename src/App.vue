<template>
  <v-app>
    <navigation></navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./views/Navigation";

export default {
  name: "App",
  components: {
    navigation: Navigation
  },
  data: () => ({})
};
</script>
