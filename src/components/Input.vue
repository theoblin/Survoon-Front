<template>
    <input id="input" :required="required" v-model="model" :type="props.type" :placeholder="props.placeholderValue">
</template>

<script setup lang="ts">
const props = defineProps(["placeholderValue", "type", "required"])

const model = defineModel()

</script>