<template>
    <div id="formError">
        <slot></slot>
    </div>
</template>


<script setup lang="ts">
const props = defineProps(['message'])


</script>