<template>
  <div>
    <form ref="formRef" aria-label="Login form" @submit.prevent="login">
      <span v-if="userStore.error">{{ userStore.error }}</span>
      <input type="email" required v-model="form.email">
      <input type="password" required v-model="form.password">

      <button class="btn btn-lg btn-primary pull-xs-right" :disabled="!form.email || !form.password" type="submit"> 
      Sign in
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { LoginUser } from 'src/services/dto';
import useUserStore from 'src/stores/user';
import { reactive } from 'vue';

const userStore = useUserStore()

const form: LoginUser = reactive({
  email: '',
  password: '',
})

async function login() {
  userStore.login(form)
}

</script>