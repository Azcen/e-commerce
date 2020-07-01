import ProductCard from './components/ProductCardComponent.vue';
import Product from './components/ProductComponent.vue';

export const routes = [
    { path: '/', component: ProductCard, name: 'ProductCard' },
    { path: '/:slug', component: Product, name: 'Product' },

    
];