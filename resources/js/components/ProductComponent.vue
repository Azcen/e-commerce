<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col
        :cols="4"
      >
        <v-card
          class="pa-2"
          tile
          outlined
          height="100%"
        >
          
          <v-img
              src="https://picsum.photos/510/300?random"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100%"
            >
            </v-img>
        </v-card>
      </v-col>
      <v-col
        :cols="8"
      >
        <v-card
          class="pa-2"
          tile
          outlined
        >
           <v-card-title class="justify-center">
            {{info.name}}
            </v-card-title>
            <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>

                <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div class="my-4 subtitle-1">
                ${{info.price}}
            </div>

            <div>{{info.description}}</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-chip
            class="ma-2"
            color="green"
            text-color="white"
            >
            
            Avaliable
            </v-chip>

            <v-card-actions>
                <v-btn
                    text
                    color="deep-purple accent-4"
                    @click="addToCart(info)"
                >
                    Add To Cart
                </v-btn>
                <v-btn
                    text
                    color="deep-purple accent-4"
                    @click="addToCart(info);$router.push('/checkout')" 
                >
                   Check out
                </v-btn>
                
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                </v-btn>
            </v-card-actions>
            
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from 'vuex';

export default {
    data() {
        return {
            info: null,
            loading: true,
            err: false,
            show: false,
            
        }
    },
    mounted() {

        this.getProduct(this.slug);
        console.log(this.slug)
        
    },
    computed: {
        
        slug(){
            return this.$store.state.slug
        },
        cart(){
            return this.$store.state.cart
        },
        totalPrice() {
        let total = 0;

        for (let item of this.$store.state.cart) {
            total += item.totalPrice;
        }

        return total.toFixed(2);
        }
    },
    methods:{
        getProduct(slug){

            const urlProduct ='api/products/'+slug;
            axios
            .get(urlProduct)
            .then(response => {
                this.info = response.data
                
            })
            .catch(error => {
                console.log(error)
                this.err = true
            })
            .finally(() => this.loading = false)

        },
        addToCart(item) {
        this.$store.commit('addToCart', item);
        },
        
    }

}
</script>
