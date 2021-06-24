import { createStore } from 'vuex';
import { UserModule } from './User';

export default createStore({
  state: {
  },
  
  // Functions that effects the state.
  mutations: {
  },

  // Functions that you pull throughout the application that call mutations.
  actions: {
  },

  modules: {
    User: UserModule

  }
})
