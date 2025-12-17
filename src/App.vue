<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
/* 전역 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  min-height: 100%;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}

#app {
  width: 100%;
  max-width: 100%;
}

.v-application {
  width: 100%;
  max-width: 100%;
}

.v-application__wrap {
  width: 100%;
  max-width: 100%;
}

.v-main {
  width: 100%;
  max-width: 100%;
  padding: 0 !important;
  margin: 0 !important;
}

.v-main > .v-main__wrap {
  width: 100%;
  max-width: 100%;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
