<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" fab small dark v-on="on" class="mx-2">
        <v-icon>mdi-calendar-edit</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-xs>
        <v-row>
          <v-col cols="12">
            <v-card-title class="headline">Edit Date</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-date-picker full-width show-current v-model="editedDate"></v-date-picker>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-actions class="justify-center">
              <v-btn color="primary darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="primary darken-1" text @click="onClick">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedDate: moment().format("YYYY-MM-DD")
    };
  },
  methods: {
    onClick() {
      if (this.editedDate == null) {
        return;
      }
      const oldTime = this.meetup.date.split(" ");
      const newDate = moment(this.editedDate + " " + oldTime[1]).format(
        "DD/MM/YYYY HH:mm"
      );
      this.dialog = false;
      this.$store.dispatch("meetups/updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    this.editedDate = moment(this.meetup.date, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD"
    );
  }
};
</script>