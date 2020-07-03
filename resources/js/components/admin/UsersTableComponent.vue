<template>
<div>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Users</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field :rules="[rules.required]" v-model="editedItem.name" label="Username"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field :rules="[rules.required, rules.email]" v-model="editedItem.email" label="Email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[
                                        rules.required, 
                                        rules.min]" :type="show ? 'text' : 'password'" name="input-10-2" label="Password" hint="At least 8 characters" class="input-group--focused" @click:append="show = !show" v-model="editedItem.password"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.role" :items="roles" label="Roles"></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>

    </v-data-table>
    <v-snackbar :timeout="4000" v-model="sucess" absolute bottom color="success">{{msg}}</v-snackbar>
</div>
</template>

<script>
export default {
    data: () => ({
        sucess: false,
        msg: "",
        dialog: false,
        show: false,
        roles: ["Admin", "Customer"],
        headers: [{
                text: "User Name",
                align: "start",
                sortable: false,
                value: "name"
            },
            {
                text: "Email",
                value: "email"
            },
            {
                text: "Role",
                value: "role"
            },
            {
                text: "Actions",
                value: "actions",
                sortable: false
            }
        ],
        rules: {
            required: value => !!value || "Required.",
            min: v => v.length >= 8 || "Min 8 characters",

            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || "Invalid e-mail";
            }
        },
        users: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            email: "",
            password: "",
            role: ""
        },
        defaultItem: {
            name: "",
            email: "",
            password: "",
            role: ""
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            const urlTable = "/api/userstable";
            const headers = {
                Authorization: `Bearer ${this.$store.state.token}`, //the token is a variable which holds the token
                Accept: "application/json"
            };
            axios
                .get(urlTable)
                .then(response => {
                    this.users = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                    this.error = true;
                })
                .finally(() => (this.loading = false));
        },

        editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            const index = this.users.indexOf(item);
            console.log(item)
            confirm("Are you sure you want to delete this item?") &&
                this.users.splice(index, 1);
                const urlDelete = "/api/auth/delete/"+item.id;
                const headers = {
                Authorization: `Bearer ${this.$store.state.token}`, //the token is a variable which holds the token
                Accept: "application/json"
            };

             axios
                    .delete(urlDelete, {
                        headers
                    })
                    .then(response => {
                        console.log(response);
                        this.msg = response.data.message;
                        if (response) {
                            this.sucess = true;
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.error = true;
                    })
                    .finally(() => (this.loading = false));

        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            console.log(this.editedItem.id);
            const urlEdit = "/api/auth/update";
            const urlSignup = "/api/auth/register";
            const headers = {
                Authorization: `Bearer ${this.$store.state.token}`, //the token is a variable which holds the token
                Accept: "application/json"
            };

            if (this.editedItem.id) {
                axios
                    .patch(urlEdit, this.editedItem, {
                        headers: headers
                    })
                    .then(response => {
                        console.log(response);
                        this.msg = response.data.message;
                        if (response) {
                            this.sucess = true;
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                        this.error = true;
                    })
                    .finally(() => (this.loading = false));
                     this.close();
            } else {
                let data = {
                    name: this.editedItem.name,
                    email: this.editedItem.email,
                    password: this.editedItem.password,
                    role: this.editedItem.role
                };

                axios
                    .post(urlSignup, data, {
                        headers: headers
                    })
                    .then(response => {
                        console.log(response.data);
                        this.msg = response.data.message;
                        if (response) {
                            this.sucess = true;
                            let user = {
                                "id": response.data.user.id,
                                "name": response.data.user.name,
                                "email": response.data.user.email,
                                "role": response.data.user.roles.name,
                            }
                            this.users.push(user);
                            console.log(response.data);
                        }
                    })
                    .catch(error => {
                        console.log(error.response.status);
                        this.error = true;
                    })
                    .finally(() => (this.loading = false));
                this.close();
            }
        }
    }
};
</script>
