<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title v-text="meetup.title"></v-card-title>
          <v-img class="white--text align-end" height="400px" :src="meetup.imageUrl"></v-img>

          <v-card-subtitle class="pb-0">{{meetup.date | date}} - {{meetup.location}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <p v-text="meetup.description"></p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  name: "Meetup",
  computed: {
    meetup() {
      return this.$store.getters["meetups/getMeetup"](this.id);
    }
  }
};
</script>