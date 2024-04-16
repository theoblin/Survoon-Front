<template>
  <div>
    <form ref="formRef" aria-label="Signup form" @submit.prevent="signup">
      <span v-if="userStore.error.signup">{{ userStore.error.signup }}</span>
      <input type="email" required v-model="form.email">
      <input type="password" required v-model="form.password">
      <input type="password" required v-model="form.passwordConfirm">

      <button class="btn btn-lg btn-primary pull-xs-right"
        :disabled="!form.email || !form.password || !form.passwordConfirm" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { RegisterUser } from 'src/services/dto';
import useUserStore from 'src/stores/user';
import { reactive } from 'vue';

const userStore = useUserStore()

const form: RegisterUser = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  type: 'user',
  language: 'fr',
})

async function signup() {
  userStore.signup(form)
}

</script>