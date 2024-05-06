<template>
    <div>
        <button :disabled="disabled">
            <slot></slot>
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['name', "disabled"])
</script>