<template>
  <div id="signup-page">
    <div id="signup-elements">
      <h2>Sign up</h2>
      <FormError id="form-error" v-if="userStore.errors.filter((error) => error.type == 'signup')">{{
        userStore.errors.filter((error) => error.type == 'signup')
      }}</FormError>
      <form id="form-group" ref="formRef" aria-label="Signup form" @submit.prevent="signup">
        <div id="input-group">
          <Input class="mb-10 default" :type="'email'" :placeholder="'Email*'" :required="true"
            v-model="form.email"></Input>
          <Input class="mb-10 default" :type="'email'" :placeholder="'Confirm email*'" :required="true"
            v-model="form.emailConfirm"></Input>
          <Input class="mb-10 default" :type="'password'" :placeholder="'Password*'" :required="true"
            v-model="form.password"></Input>
          <Input class="mb-10 default" :type="'password'" :placeholder="'Confirm password*'" :required="true"
            v-model="form.passwordConfirm"></Input>
        </div>
        <Button class="mb-10" :bstyle="'default'" type="submit">
          Sign in
        </Button>
        <div id="actions">
          <div>Déjà un compte ? <router-link to="/login">Se connecter</router-link></div>
        </div>
      </form>
    </div>
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

userStore.resetErrors()

async function signup() {
  userStore.signup(form)
}

</script>