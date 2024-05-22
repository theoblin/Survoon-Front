<template>
    <div id="profile-page">
        <!--       <div id="header">
            <div class="tab">
                Email
            </div>
            <div class="tab">
                Password
            </div>
            <div class="tab">
                Language
            </div>
        </div> -->
        <div id="profile-form">
            <FormError id="form-error" v-if="userStore.errors.filter((error) => error.type == 'update')">{{
                userStore.errors.filter((error) => error.type == 'update')[0]
            }}</FormError>
            <div class="content">

                <div class="email">
                    <div class="form-group">
                        <span>Email</span>
                        <Input :type="'email'" v-model="fromStore.email" :placeholderValue="'Email'"></Input><br>
                    </div>
                    <Button :bstyle="'default'" @click="updateEmail()">Update email</Button><br>
                </div>

                <div class="password">
                    <div>
                        <div class="form-group">
                            <span>New Password</span>
                            <Input :type="'password'" v-model="fromStore.password"
                                :placeholderValue="'password'"></Input><br>
                        </div>
                        <div class="form-group">
                            <span>Confirm new password</span>
                            <Input :placeholder="'confirm'" :type="'password'"
                                v-model="fromStore.passwordConfirm" /><br>
                        </div>
                    </div>
                    <Button :bstyle="'default'" @click="updatePassword()">Update password</Button><br>
                </div>

                <FormError id="form-error" v-if="laguageStore.errors.filter((error) => error.type == 'load')">{{
                    userStore.errors.filter((error) => error.type == 'load')[0]
                }}</FormError>


                <div class="form-group">
                    <span>Language</span>
                    <Select :attrValue="'code'" :attrDisplay="'code'" @change="updateLanguage()"
                        :options="laguageStore.languageList" v-model="fromStore.language"></Select>
                </div>

            </div>
            <br>
            <br>
            <br>
            <div class="footer">
                <Button :bstyle="'danger'" @click="deleteAccount">Delete account</Button><br>
            </div>

        </div>
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
