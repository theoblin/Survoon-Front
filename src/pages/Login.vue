<template>
  <div id="login-page">
    <div id="login-elements">
      <h3>Connexion</h3>
      <FormError id="form-error" v-if="userStore.errors.login">{{ userStore.errors.login }}</FormError>
      <form id="form-group" ref="formRef" aria-label="Login form" @submit.prevent="login">
        <div id="input-group">
          <Input class="mb-10 default" :type="'email'" :placeholder="'Email'" :required="true"
            v-model="form.email"></Input>
          <Input class="mb-10 default" :type="'password'" :placeholder="'Password'" :required="true"
            v-model="form.password"></Input>
        </div>
        <Button class="mb-10" :bstyle="'default'" type="submit">
          Sign in
        </Button>
      </form>
      <div id="actions">
        <div>Pas de compte ? <router-link to="/signup">S'inscrire</router-link></div>
        <div> <router-link to="/reset-password">Forgot password ?</router-link> </div>
      </div>
    </div>
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

userStore.resetErrors()

async function login() {
  userStore.login(form)
}

</script>