import ProductCard from './components/ProductCardComponent.vue';
import Product from './components/ProductComponent.vue';
import Checkout from './components/CheckoutComponent.vue';
import Login from './components/auth/LoginComponent.vue';
import Admin from './components/admin/AdminDashboard.vue';
import UsersTable from './components/admin/UsersTableComponent.vue';
import ProductsTable from './components/admin/ProductsTableComponent.vue';
import store from './store/store'

export const routes = [
    { path: '/', component: ProductCard, name: 'Home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/checkout', component: Checkout, name: 'Checkout' },
    { path: '/admin', component: Admin, name: 'Admin',
        beforeEnter: (to, from, next) => {
            if(store.state.userRole == 'Admin') {
                next();
            } else {
                next('/');
            }
        } 
    },
    { path: '/admin/users', component: UsersTable, name: 'UsersTable',
        beforeEnter: (to, from, next) => {
            if(store.state.userRole == 'Admin') {
                next();
            } else {
                next('/');
            }
        } 
    },
    { path: '/admin/products', component: ProductsTable, name: 'ProductsTable',
        beforeEnter: (to, from, next) => {
            if(store.state.userRole == 'Admin') {
                next();
            } else {
                next('/');
            }
        } 
    },
    { path: '/:slug', component: Product, name: 'Product'},
    

    
];