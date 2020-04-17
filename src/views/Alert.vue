<template>
  <v-container grid-list-xs v-if="error.show">
    <v-row justify="center">
      <v-col cols="6">
        <v-alert
          color="error"
          type="error"
          :value="error.show"
          transition="fade-transition"
          @input="onInput"
          dismissible
        >{{error.message}}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    onInput() {
      this.$store.commit("clearError", { root: true });
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    }
  }
};
</script>