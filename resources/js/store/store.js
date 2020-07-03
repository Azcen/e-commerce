import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export default new Vuex.Store({

        state: {
          slug: null,
          cart: [],
          token: null,
          userName: null,
          userEmail: null,
          userRole: null,
          user:[]
        },
        mutations: {
          slug(state, payload) {
            state.slug = payload
          },
          addToCart(state, payload) {
            let found = state.cart.find(product => product.id == payload.id);
      
            if (found) {
              found.quantity++;
              found.totalPrice = found.quantity * found.price;
            } else {
              state.cart.push(payload);
      
              Vue.set(payload, 'quantity', 1);
              Vue.set(payload, 'totalPrice', payload.price);
            }
          },
          removeFromCart(state, payload) {
            state.cart = state.cart.filter(item => item.id !== payload);
          },
          auth(state, payload) {
      
            state.token = payload;
          },
          userInfo(state,payload){
            
            state.userName = payload.name;
            state.userEmail = payload.email;
            state.userRole = payload.role;
            
          },
          logout(state) {
            state.token = null;
            state.userName = null;
            state.userEmail = null;
            state.userRole = null;
            state.user = null;
          },
          
        },
        actions: {
            logout (context) {
                context.commit('logout')
              }
        },
        plugins: [new VuexPersistence().plugin]
      
})