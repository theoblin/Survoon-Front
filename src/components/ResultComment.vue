<template>
    <div class="comment">
        <div class="left-comment">
            <div class="round"></div>
        </div>
        <div class="right-comment">
            <div class="header">{{ moment(props.createdDate).format('L h:mm:ss') }}</div>
            <div class="body">" {{ props.value }} "</div>
        </div>

    </div>
</template>

<script setup lang="ts">
import moment from 'moment';

const props = defineProps(['value', 'createdDate'])


</script>