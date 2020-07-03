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
            <div class="pa-2" v-show="auth==false" >
                <v-btn block @click="$router.push('/login')">Login</v-btn>
            </div>
            <div class="pa-2" v-show="auth==true" >
                <v-btn block @click="logout();">Logout</v-btn>
            </div>
            <div class="pa-2">
                <v-btn block>Register</v-btn>
            </div>
        </template>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>E-Commerce</v-toolbar-title>

    </v-app-bar>

    <v-main>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <!-- there my components -->
                <router-view></router-view>
                <!-- <passport-clients></passport-clients>
          <passport-authorized-clients></passport-authorized-clients>
          <passport-personal-access-tokens></passport-personal-access-tokens> -->
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
        }
    }
};
</script>
