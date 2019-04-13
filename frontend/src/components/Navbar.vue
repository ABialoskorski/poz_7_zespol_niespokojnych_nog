<template>
  <v-toolbar class="navbar" fixed color="primary white--text">
    <h1> PC Builder</h1>
    <v-spacer></v-spacer>
    <span class="navbar__price">Suma: {{this.allPrice.toFixed(2)}} zł</span>
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
.navbar {
  font-family: "Amika", sans-serif;
}
.navbar__price {
  font-size: 24px;
  margin-right: 40px;
}
.v-btn {
  font-size: 16px;
}
.navbar {
  position: sticky;
  top: 0;
}
</style>
