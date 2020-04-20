<template>
  <v-container grid-list-xs>
    <v-row justify="center">
      <v-col xs="12" sm="6" class="text-center">
        <v-card>
          <v-card-title primary-title>
            <h3 class="headline mb-0">Your meetups</h3>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p v-if="userMeetups.length <= 0">Not registred on any meetup yet...</p>
            <v-list v-else>
              <v-list-item v-for="meetup in userMeetups" :key="meetup.id" @click="false">
                <v-list-item-avatar>
                  <v-img :src="meetup.imageUrl"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{meetup.title}}</v-list-item-title>
                  <v-list-item-subtitle>{{meetup.date}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn text icon color="primary" :to="'meetup/' + meetup.id">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    userMeetups() {
      return this.$store.getters["meetups/getRegisteredMeetups"](
        this.$store.getters["users/getUser"].registeredMeetups
      );
    }
  }
};
</script>
