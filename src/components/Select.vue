<template>
    <select v-model="model">
        <option :selected="option.selected" v-for="(option, index) of options" :key="index">{{ option }}</option>
    </select>
</template>

<script setup lang="ts">
const model = defineModel()

const props = defineProps(['options'])

</script>