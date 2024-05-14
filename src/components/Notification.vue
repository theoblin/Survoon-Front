<template>
    <div :class="{ 'default': props.type == 'default', 'success': props.type == 'success', 'warning': props.type == 'warning', 'danger': props.type == 'danger' }"
        id="notification">
        {{ props.message }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['id', 'message', 'type'])

</script>