<template>
    <div>
        <button id="button" :class="props.bstyle" :disabled="disabled">
            <slot></slot>
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['name', "disabled", "bstyle"])
</script>