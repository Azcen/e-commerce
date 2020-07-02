import ProductCard from './components/ProductCardComponent.vue';
import Product from './components/ProductComponent.vue';
import Checkout from './components/CheckoutComponent.vue';
import Login from './components/auth/LoginComponent.vue';

export const routes = [
    { path: '/', component: ProductCard, name: 'ProductCard' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/checkout', component: Checkout, name: 'Checkout' },
    { path: '/:slug', component: Product, name: 'Product' },
    

    
];