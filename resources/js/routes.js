import ProductCard from './components/ProductCardComponent.vue';
import Product from './components/ProductComponent.vue';
import Checkout from './components/CheckoutComponent.vue';

export const routes = [
    { path: '/', component: ProductCard, name: 'ProductCard' },
    { path: '/checkout', component: Checkout, name: 'Checkout' },
    { path: '/:slug', component: Product, name: 'Product' },
    

    
];