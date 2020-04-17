<template>
  <v-container grid-list-md>
    <v-row>
      <v-col xs="12" sm="10" md="6" v-for="item in meetups" :key="item.id">
        <v-card class="mx-auto">
          <v-img class="white--text align-end" height="200px" :src="item.imageUrl">
            <v-card-title class="title-background" v-text="item.title"></v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">{{item.date | date}} - {{item.location}}</v-card-subtitle>

          <v-card-text class="text--primary">
            <p v-text="item.description"></p>
          </v-card-text>

          <v-card-actions>
            <v-btn text :to="'/meetup/' + item.id">
              <v-icon left>mdi-arrow-right</v-icon>View Meetup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Meetups",
  computed: mapGetters({
    meetups: "meetups/fetchMeetups"
  })
};
</script>
