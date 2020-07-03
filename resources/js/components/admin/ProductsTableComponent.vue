<template>
  <div>
    <v-data-table :headers="headers" :items="products" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Products</v-toolbar-title>
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="editedItem.name"
                        label="Product Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        :rules="[rules.required]"
                        v-model="editedItem.price"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select v-model="editedItem.status" :items="status" label="Status"></v-select>
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
    msg: "",
    dialog: false,
    show: false,
    sucess: false,
    status: ["Avaliable", "Out of Stock"],
    headers: [
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      {
        text: "Description",
        value: "description"
      },
      {
        text: "Price",
        value: "price"
      },
      {
        text: "Status",
        value: "status"
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false
      }
    ],
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      price: "",
      status: ""
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
      const urlTable = "/api/products/all";
      const headers = {
        Authorization: `Bearer ${this.$store.state.token}`, //the token is a variable which holds the token
        Accept: "application/json"
      };
      axios
        .get(urlTable)
        .then(response => {
          const products = response.data;
          this.products = products.map(product => ({...product, status: product.status ? 'Avaliable' : 'Out of stock'}));
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      console.log(item);
      confirm("Are you sure you want to delete this item?") &&
        this.products.splice(index, 1);
      const urlDelete = "/api/auth/products/delete/"+item.id;
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
      
      const urlUpdate = "/api/auth/products/update/";
      const urlCreate = "/api/auth/products/create";
      const headers = {
        Authorization: `Bearer ${this.$store.state.token}`, //the token is a variable which holds the token
        Accept: "application/json"
      };

      if (this.editedItem.id) {
        axios
          .patch(urlUpdate, this.editedItem, {
            headers
          })
          .then(response => {
            
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
          description: this.editedItem.description,
          price: this.editedItem.price,
          status: this.editedItem.status == 'Avaliable' ? 1 : 0
        };
            console.log(this.editedItem.status);
        axios
          .post(urlCreate, data, {
            headers: headers
          })
          .then(response => {
            console.log(response);
            this.msg = response.data.message;
            if (response) {
                
              this.sucess = true;
              let product = {
                id: response.data.product.id,
                name: response.data.product.name,
                description: response.data.product.description,
                price: response.data.product.price,
                status: response.data.product.status,
              };
              this.products.push(product);
              
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
