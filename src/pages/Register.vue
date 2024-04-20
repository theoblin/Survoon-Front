<template>
  <div>
    <FormError v-if="userStore.errors.signup">{{ userStore.errors.signup }}</FormError>
    <form ref="formRef" aria-label="Signup form" @submit.prevent="signup">
      <Input :type="'email'" :placeholder="'Email'" :required="true" v-model="form.email"></Input><br>
      <Input :type="'email'" :placeholder="'Confirm email'" :required="true" v-model="form.emailConfirm"></Input><br>
      <Input :type="'password'" :placeholder="'Password'" :required="true" v-model="form.password"></Input><br>
      <Input :type="'password'" :placeholder="'Confirm password'" :required="true"
        v-model="form.passwordConfirm"></Input><br>
      <Button :disabled="!form.email || !form.password || !form.passwordConfirm" type="submit">
        Sign in
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { RegisterUser } from 'src/services/dto';
import useUserStore from 'src/stores/user';
import { reactive } from 'vue';
import FormError from "../components/FormError.vue";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";

const userStore = useUserStore()

const form: RegisterUser = reactive({
  email: '',
  emailConfirm: '',
  password: '',
  passwordConfirm: '',
  type: 'user',
  language: 'fr',
})

async function signup() {
  userStore.signup(form)
}

</script>