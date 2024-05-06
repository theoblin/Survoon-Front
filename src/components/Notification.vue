<template>
    <div id="notification">
        {{ props }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['id', 'message', 'type'])

</script>