<template>
<v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item link @click="$router.push('/')" v-show="role=='Guest'">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Products</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$router.push('/')" v-show="role=='Admin'">
                <v-list-item-action>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$router.push('/admin/users')" v-show="role=='Admin'">
                <v-list-item-action>
                    <v-icon>mdi-account-group-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Users</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$router.push('/admin/products')" v-show="role=='Admin'">
                <v-list-item-action>
                    <v-icon>mdi-pencil</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Products</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$router.push('/checkout')" v-show="role=='Guest'">
                <v-list-item-action>
                    <v-badge :content="amount" :value="amount" color="green" overlap>
                        <v-icon>mdi-cart</v-icon>
                    </v-badge>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Checkout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
        <template v-slot:append>
            <div class="pb-2" v-show="auth==false">
                <v-btn block @click="$router.push('/login')">Login</v-btn>
            </div>
            <div class="pb-2" v-show="auth==true">
                <v-btn block @click="logout();">Logout</v-btn>
            </div>

            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template class="pa-3" v-slot:activator="{ on, attrs }">

                        <v-btn block v-bind="attrs" v-on="on">
                            Register
                        </v-btn>
                        
                    </template>
                    <v-card>
                        
                        <v-card-title>
                            <span class="headline">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="credentials.name" label="Username*" required></v-text-field>
                                    </v-col>
                                    
                                    <v-col cols="12">
                                        <v-text-field v-model="credentials.email" label="Email*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="credentials.password" label="Password*" type="password" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="credentials.password_confirmation" label="Verify Password*" type="password" required></v-text-field>
                                    </v-col>
                                    
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="dialog = false;register(credentials);">Submit</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>

        </template>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>E-Commerce</v-toolbar-title>

    </v-app-bar>

    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                
                <router-view></router-view>
                <v-snackbar :timeout="4000" v-model="sucess" absolute bottom color="success">{{msg}}</v-snackbar>
          
            </v-row>
        </v-container>
    </v-main>
    <v-footer color="indigo" app>
        <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
    props: {
        source: String
    },
    data() {
        return {
            sucess: false,
            msg: "",
            credentials: [],
            dialog: false,
            info: null,
            drawer: null,
            show: false,

        };
    },

    computed: {
        amount() {
            return this.$store.state.cart.length;
        },
        role() {
            return this.$store.state.userRole;
        },
        auth() {
            if (this.$store.state.token) {
                return true;
            } else {
                return false;
            }
        },

    },
    methods: {
        logout() {
            const urlLogout = "api/auth/logout";
            const headers = {
                Authorization: `Bearer ${this.$store.state.token}`, //the token is a variable which holds the token
                Accept: 'application/json'

            }

            axios
                .get(urlLogout, {
                    headers: headers
                })
                .then(response => {
                    this.info = response.data;

                    this.$store.commit("logout");
                })
                .catch(error => {
                    console.log(error);
                    this.err = true;
                    this.$store.commit("logout");
                })
                .finally(() => (this.loading = false));
            this.$router.push('/');
        },
        register(credentials){
            let data = {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation
                };
            
            const urlSignup = "/api/auth/signup";
            axios
                    .post(urlSignup, data)
                    .then(response => {
                        console.log(response.data);
                        this.msg = response.data.message;
                        
                            this.sucess = true;
                        
                    })
                    .catch(error => {
                        console.log(error.response.status);
                        this.error = true;
                    })
                    .finally(() => (this.loading = false));
        }
    }
};
</script>
