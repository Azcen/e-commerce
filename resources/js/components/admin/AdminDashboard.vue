<template>
<v-container class="grey lighten-5">
    <v-row dense>

        <v-col v-for="(item, i) in items" :key="i" cols="4">
            <v-card :color="item.color" dark>
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-card-title class="headline" v-text="item.title"></v-card-title>

                        <v-card-subtitle v-text="item.total"></v-card-subtitle>
                        
                    </div>

                    <v-avatar class="ma-3" >
                        <v-icon dark>{{item.icon}}</v-icon>
                    </v-avatar>
                </div>
            </v-card>
        </v-col>
    </v-row>
    <div v-if="this.$store.state.userRole == 'Admin'">You-re Admin.</div>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Users',
          total: 50,
          icon:"mdi-account",
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Products',
          artist: 'Ellie Goulding',
          total: 500,
          icon:"mdi-arrow-up-bold-box-outline",
        },
      ],
    }),
  }
</script>
