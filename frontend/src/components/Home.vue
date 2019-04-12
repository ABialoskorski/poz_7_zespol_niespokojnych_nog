<template>
  <div class="home">
    <h1 class="home__title">Komponenty</h1>
    <v-container class="my-5">
      <h2 class="grey--text">Komponenty wymagane</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="category in required(categories,true)" :key="category.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="90" class="grey lighten-2">
                <img :src="category.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ category.name }}</div>
              <div class="grey--text">{{ category.description }}</div>
            </v-card-text>

            <v-btn color="primary" dark @click.stop="dialog = true">Open</v-btn>
            <v-dialog v-model="dialog" max-width="300">
              <v-card>
                <v-card-title class="headline">Wybierz</v-card-title>
                <v-card-text>text</v-card-text>
                <v-card-actions></v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="my-5">
      <h2 class="grey--text">Komponenty opcjonalne</h2>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="category in required(categories,false)"
          :key="category.name"
        >
          <v-card v-if="!category.required" flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="90" class="grey lighten-2">
                <img :src="category.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ category.name }}</div>
              <div class="grey--text">{{ category.description }}</div>
            </v-card-text>
            <v-btn color="primary" dark @click="dialog = true">Open</v-btn>
            <v-dialog v-model="dialog" max-width="300">
              <v-card>
                <v-card-title class="headline">Wybierz</v-card-title>
                <v-card-text>text</v-card-text>
                <v-card-actions></v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      categories: [
        {
          name: "GPU",
          description: "Karta Graficzna",
          required: true
        },
        {
          name: "CPU",
          description: "Procesor",
          required: true
        },
        {
          name: "PSU",
          description: "Zasilacz",
          required: true
        },
        {
          name: "MOBO",
          description: "Płyta Główna",
          required: true
        },
        {
          name: "RAM",
          description: "Pamięć RAM",
          required: true
        },
        {
          name: "CASE",
          description: "Obudowa",
          required: true
        },
        {
          name: "DISK",
          description: "Dysk HDD/SSD",
          required: true
        },
        {
          name: "OS",
          description: "System operacyjny",
          required: false
        },
        {
          name: "CD/DVD",
          description: "Napęd optyczny",
          required: false
        },
        {
          name: "Wi-fi/Ethernet",
          description: "Karta sieciowa",
          required: false
        },
        {
          name: "CPU Cooler",
          description: "Chłodzenie CPU",
          required: false
        }
      ]
    };
  },
  methods: {
    required: function(array, required) {
      return array.filter(e => e.required === required);
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  font-size: 40px;
}
h2 {
  text-align: center;
  font-size: 24px;
}
</style>