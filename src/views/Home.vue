<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col xs="12" sm6="6" class="text-xs-center text-sm-right">
        <v-btn color="info" large to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col xs="12" sm6="6" class="text-xs-center text-sm-left">
        <v-btn color="info" large to="/meetup/new">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row class="my-2">
      <v-col cols="12">
        <v-carousel hide-delimiters show-arrows-on-hover>
          <v-carousel-item
            v-for="item in meetups"
            :src="item.imageUrl"
            :key="item.id"
            :to="'/meetup/' + item.id"
          >
            <v-sheet color="transparent" height="100%">
              <v-row class="fill-height" align="end" justify="center">
                <div class="display-3 py-2 px-4 title-background">{{item.title}}</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    meetups: [
      {
        imageUrl:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.travelmax.com%2Fwp-content%2Fuploads%2F2018%2F02%2Fnew-york-fina.jpg&f=1&nofb=1",
        id: "1",
        title: "Meetup in New York"
      },
      {
        imageUrl:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FEUMQKWJTrXTgN1O9OWOWitcxI_0%3D%2F2121x1414%2Ffilters%3Afill(auto%2C1)%2Fparis-eiffel-tower-5c1da64246e0fb00011df88c.jpg&f=1&nofb=1",
        id: "2",
        title: "Meetup in Paris"
      }
    ]
  })
};
</script>

<style>
.title-background {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>