<template>
    <div id="error">
        <div>
            ERROR
            {{ props.message }}
        </div>

    </div>
</template>


<script setup lang="ts">
const props = defineProps(['message'])


</script>