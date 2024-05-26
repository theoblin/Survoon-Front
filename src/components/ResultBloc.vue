<template>
    <div :style="{ width: props.width, height: props.height }" id="resultBloc">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['width', 'height'])

</script>