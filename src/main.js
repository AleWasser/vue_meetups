import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import DateFilter from './filters/date';

Vue.config.productionTip = false

Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyBPjwmJXMlfNrJXAy9zygPaf8JZJJhB3eU",
      authDomain: "vue-meetups-f41f7.firebaseapp.com",
      databaseURL: "https://vue-meetups-f41f7.firebaseio.com",
      projectId: "vue-meetups-f41f7",
      storageBucket: "gs://vue-meetups-f41f7.appspot.com",
      messagingSenderId: "984075085489",
      appId: "1:984075085489:web:9f2bec536083b14186e490",
      measurementId: "G-QV5QP61GK5"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('users/autoSignIn', user);
      }
    });
    this.$store.dispatch('meetups/loadMeetups');
  }
}).$mount('#app')