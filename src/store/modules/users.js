import * as firebase from 'firebase';

const state = {
    user: null,
}

const getters = {
    getUser(state) {
        return state.user;
    }
}

const mutations = {
    setUser(state, payload) {
        state.user = payload;
    }
}

const actions = {
    signUserUp({
        commit
    }, payload) {
        commit('setLoading', true, {
            root: true
        });
        commit('clearError', {}, {
            root: true
        });
        firebase.auth().createUserWithEmailAndPassword(
                payload.email,
                payload.password,
            ).then(user => {
                commit('setUser', {
                    id: user.user.uid,
                    registeredMeetups: [],
                });
                commit('setLoading', false, {
                    root: true
                });
            })
            .catch(err => {
                commit('setLoading', false, {
                    root: true
                });
                commit('setError', err, {
                    root: true
                });
            });
    },
    signUserIn({
        commit
    }, payload) {
        commit('setLoading', true, {
            root: true
        });
        commit('clearError', {}, {
            root: true
        });
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
                commit('setUser', {
                    id: user.user.uid,
                    registeredMeetups: [],
                });
                commit('setLoading', false, {
                    root: true
                });
            })
            .catch(err => {
                commit('setLoading', false, {
                    root: true
                });
                commit('setError', err, {
                    root: true
                });
            });
    },
    autoSignIn({
        commit
    }, payload) {
        commit('setUser', {
            id: payload.uid,
            registeredMeetups: []
        });
    },
    logout({
        commit
    }) {
        firebase.auth().signOut();
        commit('setUser', null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}