<template>
    <div id="profile">
        <input v-model="fromStore.email" /><button @click="updateEmail()">Update</button><br />
        {{ getUser ? getUser.createdDate : "createdDate error" }}<br />
        {{ fromStore.type ? fromStore.type : "type error" }}<br />
        <select v-model="fromStore.language" @change="updateLanguage()">
            <option :selected="language.selected" v-for="(language, index) of availablesLanguages" :key="index"
                :value="language.code">
                {{ language.code }}
            </option>
        </select><br />
        <input placeholder="password" type="password" v-model="fromStore.password" /><br />
        <input placeholder="confirm" type="password" v-model="fromStore.passwordConfirm" /><span
            v-if="getErrors.password">{{
                getErrors.password }}</span><br /><button @click="updatePassword()">Update
            password</button><br />
        <button @click="deleteAccount">Delete account</button>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { UpdateUser } from "src/services/dto";
import useUserStore from "src/stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const { getUser, getErrors } = storeToRefs(userStore);

const errors = ref({
    ermail: "",
    password: "",
});

const fromStore = ref<UpdateUser>({
    email: getUser.value.email,
    password: getUser.value.password,
    passwordOld: getUser.value.passwordOld,
    passwordConfirm: getUser.value.passwordConfirm,
    type: getUser.value.type,
    language: getUser.value.language.code,
});

const availablesLanguages = [
    { code: "fr", selected: fromStore.language == "fr" },
    { code: "en", selected: fromStore.language == "en" },
];

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
