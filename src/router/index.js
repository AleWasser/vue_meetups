import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthGuard from './auth-guard'

//* Meetups
import Meetups from '../views/Meetup/Meetups.vue';
import Meetup from '../views/Meetup/Meetup.vue';
import CreateMeetup from '../views/Meetup/CreateMeetup.vue';

//* User
import Profile from '../views/User/Profile.vue';
import Signin from '../views/User/Signin.vue';
import Signup from '../views/User/Signup.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetup/:id',
    name: 'Meetup',
    props: true,
    component: Meetup,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router