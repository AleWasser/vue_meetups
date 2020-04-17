import Vue from 'vue'
import Vuex from 'vuex'

import meetups from './modules/meetups';
import users from './modules/users';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: {
      show: false,
      message: null,
    },
  },
  getters: {
    getError(state) {
      return state.error;
    },
    getLoading(state) {
      return state.loading;
    }
  },
  mutations: {
    setLoading(state, payload) {
      return state.loading = payload;
    },
    setError(state, payload) {
      return state.error = {
        show: true,
        message: payload.message,
      };
    },
    clearError(state) {
      return state.error = {
        show: false,
        message: null,
      }
    }
  },
  modules: {
    meetups,
    users
  }
})