<template>

    <select v-model="model">
        <option value="" disabled selected>{{ props.placeholder ? props.placeholder : "Choose option" }}</option>
        <option :value="option[props.attrValue]" v-for="(option, index) of options" :key="index">{{
            option[props.attrDisplay] }}
        </option>
    </select>
</template>

<script setup lang="ts">
const model = defineModel()



const props = defineProps(['options', 'attrDisplay', 'attrValue', 'placeholder', 'selected'])

</script>