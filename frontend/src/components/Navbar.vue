<template>
  <v-toolbar fixed color="primary" dark>
    <v-btn fab small :to="{
        name: 'home'
        }">
      <v-icon>home</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <span class="navbar__price">Suma: {{this.allPrice}} zł</span>
    <v-toolbar-items>
      <v-btn flat :to="{
        name: 'products'
        }">Konfigurator</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import EventBus from "@/EventBus.js";
export default {
  data() {
    return {
      allPrice: 0
    };
  },
  mounted() {
    EventBus.$on("priceChange", val => {
      this.allPrice = val;
    });
  }
};
</script>

<style scoped lang="scss">
.navbar__price {
  font-size: 24px;
  margin-right: 40px;
}
.v-btn {
  font-size: 16px;
}
</style>