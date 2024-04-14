<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'


</script>


<template>
  <Navbar v-if="!$route.meta.hideNavbar"/>
  <div id="router_view" >
    <RouterView />
  </div>
</template>

