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
    },
    registerUserForMeetup(state, payload) {
        const id = payload.id;
        if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
            return;
        }
        state.user.registeredMeetups.push(id);
        state.user.fbKey[id] = payload.fbKey;
    },
    unregisterUserFromMeetup(state, payload) {
        const registeredMeetups = state.user.registeredMeetups;
        registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id == payload), 1);
        Reflect.deleteProperty(state.user.fbKey, payload);
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
                    fbKey: {},
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
                    fbKey: {},
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
            registeredMeetups: [],
            fbKey: {},
        });
    },
    fetchUserData({
        commit,
        getters
    }) {
        commit('clearError', {}, {
            root: true
        });
        commit('setLoading', true, {
            root: true
        });
        firebase.database().ref(`/users/${getters['getUser'].id}/registrations/`).once('value')
            .then(data => {
                const values = data.val();
                let registeredMeetups = [];
                let swappedPairs = {};
                for (let key in values) {
                    registeredMeetups.push(values[key]);
                    swappedPairs[values[key]] = key;
                }
                const updatedUser = {
                    id: getters['getUser'].id,
                    registeredMeetups: registeredMeetups,
                    fbKey: swappedPairs,
                };
                commit('setUser', updatedUser);
                commit('setLoading', false, {
                    root: true
                });
            }).catch(err => {
                commit('setError', err, {
                    root: true
                });
                commit('setLoading', false, {
                    root: true
                });
            });
    },
    logout({
        commit
    }) {
        firebase.auth().signOut();
        commit('setUser', null);
    },
    registerUserForMeetup({
        commit,
        getters
    }, payload) {
        commit('clearError', {}, {
            root: true
        });
        commit('setLoading', true, {
            root: true
        });
        const user = getters["getUser"];
        firebase.database().ref(`/users/${user.id}`).child('registrations').push(payload)
            .then(data => {
                commit('setLoading', false, {
                    root: true
                });
                commit('registerUserForMeetup', {
                    id: payload,
                    fbKey: data.key
                });
            }).catch(err => {
                commit('setError', err, {
                    root: true
                });
                commit('setLoading', false, {
                    root: true
                });
            });
    },
    unregisterUserFromMeetup({
        commit,
        getters
    }, payload) {
        commit('clearError', {}, {
            root: true
        });
        commit('setLoading', true, {
            root: true
        });
        const user = getters["getUser"];
        if (!user.fbKey) {
            return;
        }
        const fbKey = user.fbKey[payload];
        firebase.database().ref(`/users/${user.id}/registrations/`).child(fbKey).remove()
            .then(() => {
                commit('setLoading', false, {
                    root: true
                });
                commit('unregisterUserFromMeetup', payload);
            }).catch(err => {
                commit('setError', err, {
                    root: true
                });
                commit('setLoading', false, {
                    root: true
                });
            });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}