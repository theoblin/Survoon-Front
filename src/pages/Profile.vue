<template>
    <div id="profile">
        <FormError v-if="userStore.errors.update">{{ userStore.errors.update }}</FormError>
        <Input :type="'email'" v-model="fromStore.email" :placeholderValue="'Email'"></Input><br>
        <Button @click="updateEmail()">Update email</Button><br>
        <div>{{ getUser ? getUser.createdDate : "createdDate error" }}</div><br>
        <div>{{ fromStore.type ? fromStore.type : "type error" }}</div><br>
        <FormError v-if="laguageStore.errors.load">{{ laguageStore.errors.load }}</FormError>
        <Select @change="updateLanguage()" :options="laguageStore.languageList"
            v-model="fromStore.language"></Select><br>
        <div>
            <Input :type="'password'" v-model="fromStore.password" :placeholderValue="'password'"></Input><br>
            <Input :placeholder="'confirm'" :type="'password'" v-model="fromStore.passwordConfirm" /><br>
        </div>
        <Button @click="updatePassword()">Update password</Button><br>
        <Button @click="deleteAccount">Delete account</Button><br>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { UpdateUser } from "src/services/dto";
import useUserStore from "src/stores/user";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Select from "../components/Select.vue";
import FormError from "../components/FormError.vue";
import { ref } from "vue";
import useLanguageStore from "src/stores/language";

const userStore = useUserStore();
const { getUser } = storeToRefs(userStore);
const laguageStore = useLanguageStore()

laguageStore.loadLanguageList()

const fromStore = ref<UpdateUser>({
    email: getUser.value.email,
    password: getUser.value.password,
    passwordOld: getUser.value.passwordOld,
    passwordConfirm: getUser.value.passwordConfirm,
    type: getUser.value.type,
    language: getUser.value.language.code,
});

function updateEmail() {
    userStore.updateUser(getUser.value.id, {
        email: fromStore.value.email,
    })
}

function updatePassword() {
    userStore.updateUser(getUser.value.id, {
        password: fromStore.value.password,
        passwordConfirm: fromStore.value.passwordConfirm,
    })
}

function updateLanguage() {
    userStore.updateUser(getUser.value.id, {
        language: fromStore.value.language,
    })
}

function deleteAccount() {
    userStore.deleteUser(getUser.value.id);
}
</script>
