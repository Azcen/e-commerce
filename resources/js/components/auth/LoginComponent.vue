<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="7">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                v-model="credentials.email"
                :rules="[rules.required, rules.email]"
                label="E-mail"
              ></v-text-field>

              <!-- <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="credentials.password"
                :rules="[rules.required, rules.emailMatch]"
              ></v-text-field>-->
              <v-text-field
                id="password"
                v-model="credentials.password"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required, 
                  rules.min, 
                  rules.emailMatch ]"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                class="input-group--focused"
                @click:append="show = !show"
              ></v-text-field>
              <span v-if="err == true" color="red">Invalid credentials</span>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login(credentials)">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      info: null,
      err: null,
      show: false,
      credentials: {
        email: null,
        password: ''
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch : () => this.err===true || this.err=== null || `The email and password you entered doesn't match`,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail";
        }
      }
    };
  },

  methods: {
    login(credentials) {
      const urlProduct = "api/auth/login";
      axios
        .post(urlProduct, credentials)
        .then(response => {
          this.info = response.data;
          console.log(response.data.token);
          this.$store.commit("auth", response.data.token);
          console.log( response.data.user)
        })
        .catch(error => {
          console.log(error.response.status);
          this.err = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>