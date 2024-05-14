<template>Templates</template>


<script setup lang="ts">
import useNavStore from 'src/stores/nav';

const navStore = useNavStore()


navStore.setCurrentPage("templates")

</script>