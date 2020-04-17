<template>
  <div>
    <v-app-bar app color="purple" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-md-none"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Vue Meetups</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn text x-large v-for="(item, index) in menuItems" :key="index" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{item.title}}</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    isAuthenticated() {
      return (
        this.$store.getters["users/getUser"] != null &&
        this.$store.getters["users/getUser"] != undefined
      );
    },
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign Up", link: "/signup" },
        { icon: "mdi-lock-open-outline", title: "Sign in", link: "/signin" }
      ];
      if (this.isAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-supervisor",
            title: "View Meetups",
            link: "/meetups"
          },
          {
            icon: "mdi-map-marker",
            title: "Organize Meetup",
            link: "/meetup/new"
          },
          { icon: "mdi-account", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    }
  }
};
</script>