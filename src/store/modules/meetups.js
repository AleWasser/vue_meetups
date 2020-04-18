import * as firebase from 'firebase';

const state = {
    meetups: [{
            imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.travelmax.com%2Fwp-content%2Fuploads%2F2018%2F02%2Fnew-york-fina.jpg&f=1&nofb=1",
            id: "1",
            title: "Meetup in New York",
            date: new Date(),
            location: 'New York',
            description: 'A meetup in Paris',
        },
        {
            imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FEUMQKWJTrXTgN1O9OWOWitcxI_0%3D%2F2121x1414%2Ffilters%3Afill(auto%2C1)%2Fparis-eiffel-tower-5c1da64246e0fb00011df88c.jpg&f=1&nofb=1",
            id: "2",
            title: "Meetup in Paris",
            date: new Date(),
            location: 'Paris',
            description: 'A meetup in Paris',

        }
    ],
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
    }
}

const mutations = {
    createMeetup(state, payload) {
        return state.meetups.push(payload);
    },
    setLoadedMeetups(state, payload) {
        return state.meetups = payload;
    }
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
            date: payload.date.toISOString(),
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
                        creatorId: obj[key].creatorId
                    });
                }
                commit('setLoadedMeetups', meetups);
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}