import store from "../store/index";

export default (to, from, next) => {
    if (store.getters["users/getUser"]) {
        next();
    } else {
        next('/signin');
    }
}