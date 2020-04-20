<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" fab dark v-on="on">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-container grid-list-xs>
          <v-row>
            <v-col cols="12">
              <v-card-title class="headline">Edit Meetup</v-card-title>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-text>
                <v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
                <v-textarea
                  label="Enter a description"
                  name="description"
                  id="description"
                  v-model="editedDescription"
                  auto-grow
                ></v-textarea>
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
  </v-row>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onClick() {
      if (
        this.editedTitle.trim() == "" ||
        this.editedDescription.trim() == ""
      ) {
        return;
      }
      this.dialog = false;
      this.$store.dispatch("meetups/updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>