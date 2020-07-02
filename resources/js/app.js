/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

import { routes } from './routes';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuex);


const router = new VueRouter({
  mode: 'history',
  routes
});

const store = new Vuex.Store({

  state: {
      slug: null,
      cart: []
  },
  mutations: {
    slug(state, payload){
        state.slug = payload
    },
    addToCart(state, payload) {
      let found = state.cart.find(product => product.id == payload.id);

      if (found) {
          found.quantity ++;
          found.totalPrice = found.quantity * found.price;
      } else {
          state.cart.push(payload);

          Vue.set(payload, 'quantity', 1);
          Vue.set(payload, 'totalPrice', payload.price);
      }
    },
    removeFromCart(state,payload){
      state.cart = state.cart.filter(item => item.id !== payload);
    }
  },
  actions: {},
  plugins: [new VuexPersistence().plugin]
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */


// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('base-app', require('./components/layout/App.vue').default);
Vue.component('product-card', require('./components/ProductCardComponent.vue').default);
Vue.component('side-bar', require('./components/SidebarComponent.vue').default);
Vue.component('checkout', require('./components/CheckoutComponent.vue').default);
Vue.component('app-bar', require('./components/AppBarComponent.vue').default);

const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store
});