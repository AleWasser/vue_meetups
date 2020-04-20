<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">{{userIsRegistered ? 'Unregister' : 'Register'}}</v-btn>
    </template>
    <v-card>
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12">
            <v-card-title
              class="headline"
            >{{userIsRegistered ? 'Unregister from meetup?' : 'Register for meetup?'}}</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>You can always change your decision later.</v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-actions class="justify-center">
              <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="success" text @click="onClick">Confirm</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters["users/getUser"].registeredMeetups.findIndex(
          meetupId => {
            return meetupId == this.id;
          }
        ) >= 0
      );
    }
  },
  methods: {
    onClick() {
      if (this.userIsRegistered) {
        this.$store.dispatch("users/unregisterUserFromMeetup", this.id);
      } else {
        this.$store.dispatch("users/registerUserForMeetup", this.id);
      }
      this.dialog = false;
    }
  }
};
</script>