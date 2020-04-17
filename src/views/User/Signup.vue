<template>
  <v-container grid-list-xs>
    <v-row justify="center">
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-text>
            <v-container grid-list-xs>
              <form @submit.prevent="onSubmit">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col cols="12">
                    <v-btn
                      color="primary"
                      type="submit"
                      :loading="isLoading"
                      :disabled="isLoading"
                    >Sign Up</v-btn>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    email: "",
    password: "",
    confirmPassword: ""
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch("users/signUserUp", {
        email: this.email,
        password: this.password
      });
    }
  },
  watch: {
    user(value) {
      if (value != null && value != undefined) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    comparePasswords() {
      return this.password != this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    user() {
      return this.$store.getters["users/getUser"];
    },
    isLoading() {
      return this.$store.getters.getLoading;
    }
  }
};
</script>
