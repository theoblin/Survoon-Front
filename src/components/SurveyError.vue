<template>
    <div id="error">
        <div>
            {{ props.message }}
        </div>

    </div>
</template>


<script setup lang="ts">
const props = defineProps(['message'])


</script>