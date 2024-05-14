<template>
    <div class="bg"></div>
    <div id="modal">
        <div class="header">
            <font-awesome-icon @click="close()" class="close" :icon="['fas', 'square-xmark']" />
        </div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import useModaleStore from 'src/stores/modale';

const modaleStore = useModaleStore()

function close() {
    modaleStore.open = false
}

</script>