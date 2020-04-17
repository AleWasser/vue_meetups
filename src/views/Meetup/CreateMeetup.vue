<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-row justify="center" class="text-center">
          <v-col xs="12" sm="6">
            <h2>Create a new Meetup</h2>
          </v-col>
        </v-row>
        <form @submit.prevent="onSubmit">
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="imageUrl"
                v-model="imageUrl"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-img :src="imageUrl" max-height="150" max-width="250"></v-img>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-textarea
                label="Enter a description"
                name="description"
                id="description"
                v-model="description"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row justify="center" class="text-center">
            <v-col xs="12" sm="6">
              <h2>Choose date and time</h2>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-date-picker full-width show-current v-model="date"></v-date-picker>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col xs="12" sm="6">
              <v-time-picker full-width format="24hr" v-model="time"></v-time-picker>
            </v-col>
          </v-row>
          <v-row justify="center" class="text-center">
            <v-col xs="12" sm="6">
              <v-btn color="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  name: "CreateMeetup",
  data: () => ({
    title: "",
    location: "",
    imageUrl: "",
    description: "",
    date: moment().format("YYYY-MM-DD"),
    time: null
  }),
  computed: {
    formIsValid() {
      return (
        this.title != "" &&
        this.location != "" &&
        this.imageUrl != "" &&
        this.description != ""
      );
    }
  },
  methods: {
    onSubmit() {
      const timeArr = this.time.split(":");
      const dateFormat = moment(this.date, "YYYY-MM-DD")
        .set({
          hour: timeArr[0],
          minutes: timeArr[1]
        })
        .toDate();
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch("meetups/createMeetup", {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: dateFormat
      });
      this.$router.push("/meetups");
    }
  }
};
</script>
