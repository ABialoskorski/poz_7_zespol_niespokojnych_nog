<template>
  <div>
    <div class="home">
      <h1 class="home__title">Komponenty</h1>
      <v-container class="my-5">
        <h2 class="grey--text">Komponenty wymagane</h2>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="category in required(categories,true)"
            :key="category.name"
          >
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
              <v-card-actions class="right">
                <v-btn color="primary" dark @click="dialog = true">Wyszukaj</v-btn>
              </v-card-actions>
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
              <v-card-actions class="right">
                <v-btn color="primary" dark @click="dialog = true">Wyszukaj</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div class="modal-container" v-if="dialog">
      <div class="modal-background" @click="dialog=false"></div>
      <v-card class="modal">
        <v-card class="modal__element" v-for="n in 3" :key="n=1">
          <v-img
            class="white--text"
            height="400px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-img>
          <v-card-title>
            <span>Hey yay it's a describe</span>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      on: true,
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
.home__title {
  margin-top: 50px;
  text-align: center;
  font-size: 50px;
}
h2 {
  text-align: center;
  font-size: 24px;
}
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  position: fixed;
  width: 80%;
  height: 80%;
  &__element {
    display: inline-block;
    //flex-direction: row;
    width: 33.3%;
    height: 33.3%;
  }
}
.modal-background {
  background-color: black;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.9;
}
</style>