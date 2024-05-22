<template>
    <nav>
        <div id="part_1">
            <div class="logo">
                Logo
            </div>
        </div>
        <div id="part_2">
            <router-link :class="{ 'selected': navStore.currentPage == 'surveys', 'link': true }" to="/surveys">
                <font-awesome-icon :icon="['fas', 'rectangle-list']" />&nbsp;Surveys
            </router-link>
            <router-link :class="{ 'selected': navStore.currentPage == 'templates', 'link': true }"
                to="/templates"><font-awesome-icon :icon="['fas', 'brush']" />&nbsp;Templates</router-link>
            <router-link :class="{ 'selected': navStore.currentPage == 'results', 'link': true }" to="">
                <font-awesome-icon :icon="['fas', 'square-poll-vertical']" />&nbsp;Results</router-link>
        </div>
        <div id="part_3">
            <div class="profile">
                <div class="zone">
                    <div class="round" @click="navStore.toggleUserDropdown()">
                        <strong>{{ getUser ? getUser.email.charAt(0).toUpperCase() : "User"
                            }}</strong>
                    </div>
                    <div @click="navStore.toggleLangDropdown()">
                        <img class="flag" :src="getImgUrl(getUser.language.code)">
                        <font-awesome-icon class="icon-drop" :icon="['fas', 'chevron-down']" />
                    </div>

                </div>

                <div v-if="navStore.openUser" class="user-dropdown">
                    <div class="header">
                        <div class="email item">
                            <i> {{ getUser.email }}</i>
                        </div>
                        <div class="type item">
                            <i> {{ getUser.type }}</i>
                        </div>
                    </div>
                    <div class="content">
                        <div class="profile drop-item">
                            <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                            <router-link @click="navStore.closeUserDropdown()" class="link-dropdown"
                                to="/profile">Profile</router-link>
                        </div>
                        <div class="help drop-item">
                            <font-awesome-icon class="icon" :icon="['fas', 'circle-question']" />
                            <router-link @click="navStore.closeUserDropdown()" class="link-dropdown"
                                to="/profile">Aide</router-link>
                        </div>

                    </div>
                    <div class="footer">
                        <div class="logout drop-item">
                            <font-awesome-icon class="icon" :icon="['fas', 'right-from-bracket']" />
                            <a class="link-dropdown" href="#"
                                @click="logout(); navStore.closeUserDropdown()">Deconnexion</a>
                        </div>
                    </div>


                </div>

                <div v-if="navStore.openLang" class="lang-dropdown">
                    <div class="content">
                        <div class="lang" v-for="item in react.languages">
                            <img class="flag" :src="getImgUrl(item.language.code)">

                        </div>
                    </div>
                </div>
            </div>

        </div>

    </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useUserStore from 'src/stores/user';
import useNavStore from 'src/stores/nav';
import { useRoute } from 'vue-router';
import { api } from 'src/services';
import { reactive } from 'vue';

const {
    getUser,
} = storeToRefs(
    useUserStore()
);

const route = useRoute()

const userStore = useUserStore()
const navStore = useNavStore()

async function logout() {
    userStore.logout()
}

function getImgUrl(lg: string) {
    return new URL('../assets/languages/' + lg + ".svg", import.meta.url).href
}

const react: any = reactive({
    languages: null,
})


api.language.getAllLanguages().then(e => {
    console.log(e)
    react.languages = e.data
})



</script>