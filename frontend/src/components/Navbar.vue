<template>
  <v-toolbar color="primary" dark>
    <v-btn fab small :to="{
        name: 'home'
        }">
      <v-icon>home</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat :to="{
        name: 'products'
        }">Konfigurator</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
};
</script>

<style scoped lang="scss">
.v-btn {
  font-size: 16px;
}
</style>