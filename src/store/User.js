export const UserModule = {
    namespaced : true,

    state: {
        user: null
    },

    // Functions that effects the state.
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },

    // Functions that you pull throughout the application that call mutations.
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user);
        }
    }
}