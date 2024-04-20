<template>
  <div>
    <FormError v-if="userStore.errors.login">{{ userStore.errors.login }}</FormError>
    <form ref="formRef" aria-label="Login form" @submit.prevent="login">
      <Input :type="'email'" :required="true" v-model="form.email"></Input>
      <Input :type="'password'" :required="true" v-model="form.password"></Input>
      <Button :disabled="!form.email || !form.password" type="submit">
        Sign in
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { LoginUser } from 'src/services/dto';
import useUserStore from 'src/stores/user';
import { reactive } from 'vue';
import FormError from "../components/FormError.vue";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";

const userStore = useUserStore()

const form: LoginUser = reactive({
  email: '',
  password: '',
})

async function login() {
  userStore.login(form)
}

</script>