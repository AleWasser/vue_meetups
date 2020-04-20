import * as firebase from 'firebase';

const state = {
    meetups: [],
}

const getters = {
    fetchMeetups(state) {
        return state.meetups.sort((a, b) => {
            return a.date > b.date;
        });
    },
    featuredMeetups(state, getters) {
        return getters.fetchMeetups.slice(0, 5);
    },
    getMeetup(state) {
        return (id) => {
            return state.meetups.find(item => item.id === id);
        }
    },
    getRegisteredMeetups(state) {
        return (meetupsId) => {
            let meetups = [];
            meetupsId.forEach(item => {
                meetups.push(state.meetups.find(meetup => meetup.id == item));
            });
            return meetups;
        }
    }
}

const mutations = {
    createMeetup(state, payload) {
        return state.meetups.push(payload);
    },
    setLoadedMeetups(state, payload) {
        return state.meetups = payload;
    },
    updateMeetup(state, payload) {
        const meetup = state.meetups.find(meetup => {
            return meetup.id === payload.id;
        });
        if (payload.title) {
            meetup.title = payload.title;
        }
        if (payload.description) {
            meetup.description = payload.description;
        }
        if (payload.date) {
            meetup.date = payload.date;
        }
    },
}

const actions = {
    createMeetup({
        commit,
        rootGetters
    }, payload) {
        commit('clearError', {}, {
            root: true
        });
        const meetup = {
            title: payload.title,
            location: payload.location,
            description: payload.description,
            date: payload.date,
            creatorId: rootGetters["users/getUser"].id
        }
        let imageUrl;
        let key;
        //* Store in database
        firebase.database().ref('meetups').push(meetup)
            .then((data) => {
                key = data.key
                return key;
            })
            .then(key => {
                //* Store image in storage
                const filename = payload.image.name;
                const ext = filename.slice(filename.lastIndexOf('.'));
                return firebase.storage().ref(`meetups/${key}${ext}`).put(payload.image);
            })
            .then(fileData => {
                return fileData.ref.getDownloadURL();
            })
            .then(url => {
                imageUrl = url;
                return firebase.database().ref('meetups').child(key).update({
                    imageUrl: imageUrl,
                    id: key,
                });
            })
            .then(() => {
                commit('createMeetup', {
                    ...meetup,
                    id: key,
                    imageUrl: imageUrl
                });
            })
            .catch(err => {
                commit('setError', err, {
                    root: true
                });
            });
    },
    loadMeetups({
        commit
    }) {
        commit('clearError', {}, {
            root: true
        });
        commit('setLoading', true, {
            root: true
        });
        firebase.database().ref('meetups').once('value')
            .then(data => {
                const meetups = [];
                const obj = data.val();
                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        date: obj[key].date,
                        location: obj[key].location,
                        creatorId: obj[key].creatorId
                    });
                }
                commit('setLoadedMeetups', meetups)
                commit('setLoading', false, {
                    root: true
                });
            })
            .catch(err => {
                commit('setError', err, {
                    root: true
                });
                commit('setLoading', false, {
                    root: true
                });
            })
    },
    updateMeetupData({
        commit
    }, payload) {
        commit('clearError', {}, {
            root: true
        });
        commit('setLoading', true, {
            root: true
        });
        const updateObj = {};
        if (payload.title) {
            updateObj.title = payload.title;
        }
        if (payload.description) {
            updateObj.description = payload.description;
        }
        if (payload.date) {
            updateObj.date = payload.date;
        }
        firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false, {
                    root: true
                });
                commit('updateMeetup', payload);
            })
            .catch(err => {
                commit('setError', err, {
                    root: true
                });
                commit('setLoading', false, {
                    root: true
                });
            });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}