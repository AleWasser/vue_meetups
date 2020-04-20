<template>
  <v-container grid-list-xs>
    <v-row class="text-center" v-if="loader">
      <v-col cols="12">
        <v-progress-circular indeterminate color="primary" width="8" size="100"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>
            {{meetup.title}}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup-detail :meetup="meetup"></edit-meetup-detail>
            </template>
          </v-card-title>

          <v-img class="white--text align-end" height="400px" :src="meetup.imageUrl"></v-img>

          <v-card-subtitle class="pb-0">
            {{meetup.date}} - {{meetup.location}}
            <edit-meetup-date :meetup="meetup" v-if="userIsCreator"></edit-meetup-date>
            <edit-meetup-time :meetup="meetup" v-if="userIsCreator"></edit-meetup-time>
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <p v-text="meetup.description"></p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <register-meetup :id="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></register-meetup>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditMeetupDetailDialog from "../../components/Meetup/Edit/EditMeetupDetailDialog";
import EditMeetupDateDialog from "../../components/Meetup/Edit/EditMeetupDateDialog";
import EditMeetupTimeDialog from "../../components/Meetup/Edit/EditMeetupTimeDialog";
import RegisterMeetupDialog from "../../components/Meetup/Registration/RegisterDialog";

export default {
  props: ["id"],
  name: "Meetup",
  components: {
    "edit-meetup-detail": EditMeetupDetailDialog,
    "edit-meetup-date": EditMeetupDateDialog,
    "edit-meetup-time": EditMeetupTimeDialog,
    "register-meetup": RegisterMeetupDialog
  },
  computed: {
    loader() {
      return this.$store.getters.getLoading;
    },
    meetup() {
      return this.$store.getters["meetups/getMeetup"](this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters["users/getUser"] != null &&
        this.$store.getters["users/getUser"] != undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters["users/getUser"].id == this.meetup.creatorId;
    }
  }
};
</script>