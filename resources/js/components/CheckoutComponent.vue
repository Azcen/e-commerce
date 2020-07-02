<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col class="pa-4">
                <v-toolbar
            flat
            color="teal accent-4"
            dark
            >
        
            <v-toolbar-title>Items In Your Cart</v-toolbar-title>
        </v-toolbar>
        <v-simple-table >
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left" width= "5%">Qty</th>
                <th class="text-left">Product</th>
                <th class="text-left" width= "10%">Unit Price</th>
                <th class="text-left" width= "10%">Price</th>
                <th class="text-left" width= "10%">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                <td>{{ item.quantity }}</td>
                <td>{{ item.name }}</td>
                <td>${{ item.price }}</td>
                <td>${{ item.totalPrice }}</td>
                <td><v-btn icon @click="removeFromCart(item.id)"><v-icon color="red " >mdi-trash-can</v-icon></v-btn></td>
                </tr>
            </tbody>
            <thead>
                <tr>
                <th class="text-left" >&nbsp;</th>
                <th class="text-left" >&nbsp;</th>
                <th class="text-left" width= "10%">Subtotal</th>
                <th class="text-left" width= "10%">${{totalPrice}} USD</th>
                </tr>
            </thead>
            <thead>
                <tr>
                <th class="text-left" >&nbsp;</th>
                <th class="text-left" >&nbsp;</th>
                <th class="text-left" width= "10%">Shipping</th>
                <th class="text-left" width= "10%">$0 USD</th>
                </tr>
            </thead>
            <thead>
                <tr>
                <th class="text-left" >&nbsp;</th>
                <th class="text-left" >&nbsp;</th>
                <th class="text-left" width= "10%">Totalotal</th>
                <th class="text-left" width= "10%">${{totalPrice}} USD</th>
                </tr>
            </thead>
            
            </template>
        </v-simple-table>
            </v-col>
        </v-row>

        <v-row
            class="mb-6 mt-6"
            no-gutters
            >
            <v-col cols="12" sm="10" md="8" lg="6" class='pa-4'>
                <v-card ref="form">
                    <v-toolbar
                        flat
                        color="teal accent-4"
                        dark
                        >
                    
                        <v-toolbar-title>Billing Information</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                            ref="name"
                            v-model="name"
                            :rules="[() => !!name || 'This field is required']"
                            :error-messages="errorMessages"
                            label="Full Name"
                            placeholder="John Doe"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="address"
                            v-model="address"
                            :rules="[
                            () => !!address || 'This field is required',
                            () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
                            addressCheck
                            ]"
                            label="Address Line"
                            placeholder="Snowy Rock Pl"
                            counter="25"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="city"
                            v-model="city"
                            :rules="[() => !!city || 'This field is required', addressCheck]"
                            label="City"
                            placeholder="El Paso"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="state"
                            v-model="state"
                            :rules="[() => !!state || 'This field is required']"
                            label="State/Province/Region"
                            required
                            placeholder="TX"
                        ></v-text-field>
                        <v-text-field
                            ref="zip"
                            v-model="zip"
                            :rules="[() => !!zip || 'This field is required']"
                            label="ZIP / Postal Code"
                            required
                            placeholder="79938"
                        ></v-text-field>
                        <v-autocomplete
                            ref="country"
                            v-model="country"
                            :rules="[() => !!country || 'This field is required']"
                            :items="countries"
                            label="Country"
                            placeholder="Select..."
                            required
                        ></v-autocomplete>
                    </v-card-text>
                    <v-divider class="mt-12"></v-divider>
                        <!-- <v-card-actions>
                        <v-btn text>Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-slide-x-reverse-transition>
                            <v-tooltip
                            v-if="formHasErrors"
                            left
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                icon
                                class="my-0"
                                v-bind="attrs"
                                @click="resetForm"
                                v-on="on"
                                >
                                <v-icon>mdi-refresh</v-icon>
                                </v-btn>
                            </template>
                            <span>Refresh form</span>
                            </v-tooltip>
                        </v-slide-x-reverse-transition>
                        <v-btn color="primary" text @click="submit">Submit</v-btn>
                        </v-card-actions> -->
                </v-card>
            </v-col>
            <v-col class='pa-4'>
                <v-card ref="form">
                    <v-toolbar
                        flat
                        color="teal accent-4"
                        dark
                        >
                    
                        <v-toolbar-title>Payment Information</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        ref="card"
                                        v-model="card"
                                        :rules="[() => !!card || 'This field is required']"
                                        :error-messages="errorMessages"
                                        label="Credit Card"
                                        placeholder="Card Number"
                                        maxlength="19"
                                        required
                                        @change="value => card = `${value.slice(0,4)} ${value.slice(4,8)} ${value.slice(8,12)} ${value.slice(12,16)}${value.slice(16)}`"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        ref="cvc"
                                        v-model="cvc"
                                        :rules="[
                                        () => !!cvc || 'This field is required',
                                        () => !!cvc && cvc.length >= 3 || 'Address must 3 characters',
                                        
                                        ]"
                                        label="CVC"
                                        placeholder="CVC"
                                        counter="3"
                                        maxlength="3"
                                        required
                                        
                                    ></v-text-field>
                                    
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        ref="expDate"
                                        v-model="expDate"
                                        :rules="[
                                        () => !!expDate || 'This field is required',
                                        ]"
                                        label="Exp. Date"
                                        placeholder="MM/YY"
                                        maxlength="4"
                                        required
                                        @change="value => expDate = `${value.slice(0,2)}/${value.slice(2,4)}`"
                                    ></v-text-field>
                                    
                                </v-col>
                            </v-row>
                        </v-container>
                        
                    </v-card-text>
                    <v-divider class="mt-12"></v-divider>
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
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            errorMessages: '',
            name: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            country: null,
            formHasErrors: false,
            card: null,
            expDate: null,
            cvc: null,
            
            
        }
    },
    mounted() {

        
    },
    computed: {
        
        cart(){
            return this.$store.state.cart
        },
        totalPrice() {
        // let total = 0;

        // for (let item of this.$store.state.cart) {
        //     total += item.totalPrice;
        // }
        const total = this.$store.state.cart.reduce(((accumulator, current) => accumulator + current.totalPrice),0);

        return total.toFixed(2);
        },
        form(){
            return {
            name: this.name,
            address: this.address,
            city: this.city,
            state: this.state,
            zip: this.zip,
            country: this.country,
            }
        },
        cardForm(){
            return {
            card: this.card,
            expDate: this.expDate,
            cvc: this.cvc,
            zipCode: this.zipCode,
            }
        },
        
        
    },
    methods:{
        addressCheck () {
        this.errorMessages = this.address && !this.name
          ? 'Hey! I\'m required'
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
      removeFromCart(id){
          
          this.$store.commit('removeFromCart', id);
          

      }
        
    },
    watch: {
      name () {
        this.errorMessages = ''
      },
    },

}
</script>
