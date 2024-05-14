<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Notification from './components/Notification.vue'
import NotificationList from './components/NotificationList.vue'
import useNotificationStore from 'src/stores/notifications';

const notificationStore = useNotificationStore()

</script>


<template>
  <Navbar v-if="!$route.meta.hideNavbar" />
  <div id="router-view">
    <RouterView />
  </div>
  <NotificationList v-if="(notificationStore.getNotifications.length > 0)">
    <div v-for="notif in notificationStore.getNotifications">
      <Notification :message="notif.message" :type="notif.type" :id="notif.id">{{ notif }}</Notification>
    </div>
  </NotificationList>
</template>
