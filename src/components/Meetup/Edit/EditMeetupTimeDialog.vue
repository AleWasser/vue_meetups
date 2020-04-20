<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" fab small dark v-on="on">
        <v-icon>mdi-alarm-snooze</v-icon>
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
              <v-time-picker full-width format="24hr" v-model="editTime"></v-time-picker>
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
      editTime: moment().format("HH:mm")
    };
  },
  methods: {
    onClick() {
      if (this.editTime == null) {
        return;
      }
      const oldDate = this.meetup.date.split(" ");
      const newDate = moment(
        oldDate[0] + " " + this.editTime,
        "DD/MM/YYYY HH:mm"
      ).format("DD/MM/YYYY HH:mm");
      this.dialog = false;
      this.$store.dispatch("meetups/updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    this.editTime = moment(this.meetup.date, "DD/MM/YYYY HH:mm").format(
      "HH:mm"
    );
  }
};
</script>