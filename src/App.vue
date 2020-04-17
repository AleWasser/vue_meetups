<template>
  <v-app>
    <navigation></navigation>
    <v-content>
      <alert></alert>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./views/Navigation";
import Alert from "./views/Alert";

export default {
  name: "App",
  components: {
    navigation: Navigation,
    alert: Alert
  },
  data: () => ({})
};
</script>
