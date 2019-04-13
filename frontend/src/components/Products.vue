<template>
  <div>
    <div class="product">
      <v-container class="my-5">
        <h2>Komponenty wymagane</h2>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="category in required(categories,true)"
            :key="category.name"
          >
            <v-card v-if="!category.product" flat class="text-xs-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="90" class="grey lighten-2">
                  <img src="https://via.placeholder.com/100x100">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ category.name }}</div>
              </v-card-text>
              <v-card-actions class="right">
                <v-btn class="btn" @click="openDialog(true, category.id)">Wybierz</v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-else flat class="text-xs-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="90" class="grey lighten-2">
                  <img :src="category.product.images[0].url">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ category.product.name }}</div>
              </v-card-text>
              <v-card-text>
                <div class="subheading">{{ category.name }}</div>
              </v-card-text>
              <v-card-actions class="right">
                <v-btn class="btn" @click="openDialog(true, category.id)">Wybierz</v-btn>
                <v-btn color="secondary" dark @click="remove(category)">Usuń</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container class="my-5">
        <h2>Komponenty opcjonalne</h2>
        <v-layout row wrap>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="category in required(categories,false)"
            :key="category.name"
          >
            <v-card v-if="!category.product" flat class="text-xs-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="90" class="grey lighten-2">
                  <img src="https://via.placeholder.com/100x100">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ category.name }}</div>
              </v-card-text>
              <v-card-actions class="right">
                <v-btn class="btn" @click="openDialog(true, category.id)">Wybierz</v-btn>
              </v-card-actions>
            </v-card>
            <v-card v-else flat class="text-xs-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="90" class="grey lighten-2">
                  <img :src="category.product.images[0].url">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <v-card-text>
                <div class="subheading">{{ category.product.name }}</div>
              </v-card-text>
                <div class="subheading">{{ category.name }}</div>
              </v-card-text>
              <v-card-actions class="right">
                <v-btn class="btn" @click="openDialog(true, category.id)">Wybierz</v-btn>
                <v-btn color="secondary" dark @click="remove(category)">Usuń</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div class="modal-container" v-if="dialog">
      <input class="button" type="text" v-model="phrase" @input="debounceInput()">
      <div class="modal-background" @click="openDialog(false)"></div>
      <div class="modal">
        <div style="width: 300px;">
          <button class="button" @click="move(-1)">
            <i class="left-arrow"></i>
          </button>
        </div>
        <div class="flex-row">
          <div class="flex-row">
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
                <a class="product__link" :href="product.link" target="_blank">Przeglądaj</a>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 400px;">
          <button class="button" @click="move(1)">
            <i class="right-arrow"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/EventBus.js";
import debounce from "debounce";

  export default {
    data() {
      return {
        start: 0,
        amount: 3,
        max: 21,
        actualMax: 0,
        allPrice: 0,
        on: true,
        dialog: false,
        products: [],
        categories: [],
        cart: [],
        category: null,
        phrase: ''
      };
    },
    methods: {
      required: function (array, required) {
        return array.filter(e => e.required === required);
      },
      openDialog(value, id) {
        if (!value) {
          this.dialog = false;
          return;
        }
        this.category = id
        this.loadProducts()
      },
      loadProducts() {
        this.start = 0
        fetch(`http://localhost:3000/search?category=${this.category}&limit=${this.max}&phrase=${this.phrase}`)
          .then(res => res.json())
          .then(body => {
            this.products = body.map(e => {
              return Object.assign(e, {category: this.category});
            });
            this.actualMax = this.products.length
            this.dialog = true;
          });
      },
      choose(product) {
        const category = this.categories.find(e => e.id === product.category)
        if (!category.product) {
          this.cart.push(product)
        } else {
          const index = this.cart.findIndex(e => e.category === category.id)
          this.cart[index] = product
        }
        this.$set(category, 'product', product)
        this.openDialog(false);
        this.priceSum();
      },
      priceSum() {
        this.allPrice = this.cart.reduce((p, c) => p + Number(c.price), 0)
        EventBus.$emit("priceChange", this.allPrice);
      },
      move(direction) {
        this.start = (this.start + this.actualMax + direction * this.amount) % this.actualMax
      },
      slice(array) {
        return array.slice(this.start, this.start + this.amount)
      },
      debounceInput() {
        debounce(this.loadProducts, 700)()
      },
      remove(category) {
        const index = this.cart.findIndex(e => e.id === category.product.id)
        this.cart.splice(index, 1)
        const cat = this.categories.find(e => e.id === category.id)
        this.$set(cat, 'product', undefined)
        this.priceSum()
      }
    },
    loadProducts() {
      this.start = 0;
      fetch(
        `http://localhost:3000/search?category=${this.category}&limit=${
          this.max
        }&phrase=${this.phrase}`
      )
        .then(res => res.json())
        .then(body => {
          this.products = body.map(e => {
            return Object.assign(e, { category: this.category });
          });
          this.dialog = true;
        });
    },
    choose(product) {
      const category = this.categories.find(e => e.id === product.category);
      if (!category.product) {
        this.cart.push(product);
      } else {
        const index = this.cart.findIndex(e => e.category === category.id);
        this.cart[index] = product;
      }
      this.$set(category, "product", product);
      this.openDialog(false);
      this.priceSum();
    },
    priceSum() {
      this.allPrice = this.cart.reduce((p, c) => p + Number(c.price), 0);
      EventBus.$emit("priceChange", this.allPrice);
    },
    move(direction) {
      this.start = (this.start + this.max + direction * this.amount) % this.max;
    },
    slice(array) {
      return array.slice(this.start, this.start + this.amount);
    },
    debounceInput() {
      debounce(this.loadProducts, 700)();
    },
    remove(category) {
      const index = this.cart.findIndex(e => e.id === category.product.id);
      this.cart.splice(index, 1);
      const cat = this.categories.find(e => e.id === category.id);
      this.$set(cat, "product", undefined);
      this.priceSum();
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
:focus {
  outline: none;
}
.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #ff5a00;
  color: white;
}
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
  color: #ff5a00;
}

.product__price {
  font-size: 16px;
}

.v-card__title {
  font-size: 16px;
}

.product__title {
  text-align: center;
  font-size: 50px;
}

h2 {
  text-align: center;
  font-size: 28px;
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

.flex-row {
  display: flex;
  justify-content: space-around;
  height: 100%;
}

.modal {
  position: fixed;
  width: 82%;
  height: 82%;
  background: transparent;
  display: flex;

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
  height: 100%;
  width: 100%;
  background-color: transparent;
}

i {
  border: solid white;
  border-width: 0 10px 10px 0;
  display: inline-block;
  padding: 10px;
}

.right-arrow {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left-arrow {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
