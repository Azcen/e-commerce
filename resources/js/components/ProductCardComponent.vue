<template>
    <section v-if="err">
        <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
    </section>
    <section v-else>
        
        <v-item-group>
            <v-container grid-list-md>
                <v-layout wrap>
                    <div v-if="loading">
                        <v-progress-circular
                        indeterminate
                        color="purple"
                        ></v-progress-circular>
                    </div>
                    <v-flex v-else v-for="(product, index ) in info" :key="index" xs12 md4>
                        <v-item>
                            
                            <v-card class="mx-auto" max-width="344" >
                                <v-img src="https://picsum.photos/510/300?random" height="200px"></v-img>

                                <v-card-title>
                                    {{ product.name }}
                                </v-card-title>

                                <v-card-subtitle>
                                    {{ product.description }}
                                </v-card-subtitle>

                                <v-card-actions>
                                    <v-btn text @click="addToCart(product)">Add to Cart</v-btn>

                                    <v-btn color="purple" v-model="slug" @click="slug = product.slug; $store.commit('slug',slug); $router.push(product.slug)" text >
                                       
                                       View
                                       
                                    </v-btn>
                                    

                                    <v-spacer></v-spacer>

                                    
                                </v-card-actions>

                                
                            </v-card>
                        </v-item>
                    </v-flex>
                </v-layout>
            </v-container>
            <template>
                <div class="text-center">
                    <v-pagination
                    v-model="pagination.current_page"
                    :length="pagination.last_page"
                    :total-visible="7"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                    @input="changePage(pagination.current_page)"
                    ></v-pagination>
                </div>
            </template>
            
        </v-item-group>
    </section>
</template>


<script>

import {mapState, mapMutations} from 'vuex';

export default {
    data() {
        return {
            info: null,
            loading: true,
            err: false,
            show: false,
            slug: null,
            pagination: {
                'total': 0,
                'current_page':0,
                'per_page':0,
                'last_page':0,
                'from':0,
                'to':0,
            
            },
        }
    },
    mounted() {

        this.getProducts();
        
    },
    computed:{}
    ,

    methods:{
        getProducts(page){

            const urlProduct ='api/products?page='+page;
            axios
            .get(urlProduct)
            .then(response => {
                this.info = response.data.products.data
                this.pagination = response.data.pagination
                
            })
            .catch(error => {
                console.log(error)
                this.err = true
            })
            .finally(() => this.loading = false)

        },
        changePage(page){
            this.pagination.current_page = page;
            this.getProducts(page);
        },
        addToCart(item) {
        this.$store.commit('addToCart', item);
        },
       
    }

}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
