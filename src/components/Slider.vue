<template>
    <div id="slider">
        <input v-model="model" type="range">
    </div>
</template>

<script setup lang="ts">
const model = defineModel()

</script>