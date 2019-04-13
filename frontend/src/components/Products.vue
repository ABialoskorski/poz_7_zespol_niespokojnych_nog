<template>
  <div>
    <div class="product">
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
                <v-btn color="primary" dark @click="openDialog(true, category.id)">Wybierz</v-btn>
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
                <v-btn color="primary" dark @click="openDialog(true, category.id)">Wyszukaj</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div class="modal-container" v-if="dialog">
      <div class="modal-background" @click="openDialog(false)"></div>
      <div class="modal">
        <button class="button" @click="move(-1)">lewo</button>
        <div
          class="modal__element"
          @click="choose(product)"
          v-for="product in slice(products)"
          :key="product.id"
        >
          <img :src="product.images[0].url">
          <v-card-title>
            <span>{{product.name}}</span>
          </v-card-title>
          <div class="product__details">
            <span class="product__price">{{product.price}} zł</span>
            <a class="product__link" :href="product.link">Przeglądaj</a>
          </div>
        </div>
        <button class="button" @click="move(1)">prawo</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/EventBus.js";

export default {
  data() {
    return {
      start: 0,
      amount: 3,
      max: 21,
      allPrice: 0,
      on: true,
      dialog: false,
      products: [],
      categories: []
    };
  },
  methods: {
    required: function(array, required) {
      return array.filter(e => e.required === required);
    },
    openDialog(value, id) {
      if (!value) {
        this.dialog = false;
        return;
      }
      this.start = 0
      fetch(`http://localhost:3000/search?category=${id}&limit=${this.max}`)
        .then(res => res.json())
        .then(body => {
          this.products = body.map(e => {
            return Object.assign(e, { category: id });
          });
          this.dialog = true;
        });
    },
    choose(product) {
      this.categories.find(e => {
        return e.id === product.category;
      });
      this.categories.find(e => e.id === product.category).avatar =
        product.images[0].url;
      this.openDialog(false);
      this.priceSum(product);
    },
    priceSum(product) {
      this.allPrice += Number(product.price);
      EventBus.$emit("priceChange", this.allPrice);
    },
    move(direction) {
      this.start = (this.start + this.max + direction * this.amount) % this.max
    },
    slice(array) {
      return array.slice(this.start, this.start + this.amount)
    }
  },
  mounted() {
    fetch(`http://localhost:3000/categories`)
      .then(res => res.json())
      .then(categories => {
        this.categories = categories;
      });
  }
};
</script>

<style scoped lang="scss">
.product,
.modal-container {
  font-family: "Amika", sans-serif;
}
.product__details {
  display: flex;
  flex-flow: column;
  text-align: right;
}
.product__title {
  font-family: "Amika", sans-serif;
  text-align: center;
}
.product__link {
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
}
.product__price {
  font-size: 16px;
}
.v-card__title {
  font-size: 16px;
}
.products__title {
  text-align: center;
  font-size: 50px;
}
h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}
.modal-container {
  position: fixed;
  margin-top: 70px;
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
  width: 82%;
  height: 82%;
  display: flex;
  justify-content: space-around;
  background: transparent;
  &__element {
    display: flex;
    padding: 30px;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    height: 100%;
    margin-left: 10px;
    width: 30%;
    background: white;
    cursor: pointer;
    img {
      width: 100%;
    }
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
.button {
  background: white;
}
</style>
