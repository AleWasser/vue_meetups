<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col xs="12" sm="10" md="6">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.travelmax.com%2Fwp-content%2Fuploads%2F2018%2F02%2Fnew-york-fina.jpg&f=1&nofb=1"
          >
            <v-card-title class="title-background">My Meetup</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">24th April 2020</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn text to="/meetup/1">
              <v-icon left>mdi-arrow-right</v-icon>View Meetup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Meetups"
};
</script>
