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
    }
}

const actions = {
    createMeetup({
        commit
    }, payload) {
        const meetup = {
            id: new Date(),
            title: payload.title,
            location: payload.location,
            imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date,
        }
        //Reach out to database
        commit('createMeetup', meetup);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}