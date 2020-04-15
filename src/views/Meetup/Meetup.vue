<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>My Meetup</v-card-title>
          <v-img
            class="white--text align-end"
            height="400px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-img>

          <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
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
  name: "Meetup"
};
</script>