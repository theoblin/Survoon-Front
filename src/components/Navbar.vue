<template>
    <nav>
        <div id="part_1">
            <div class="logo">
                Logo
            </div>
        </div>
        <div id="part_2">
            <router-link :class="{ 'selected': navStore.currentPage == 'surveys', 'link': true }" to="/surveys">Mes
                surveys</router-link>
            <router-link :class="{ 'selected': navStore.currentPage == 'templates', 'link': true }" to="/templates">Mes
                templates</router-link>
            <router-link :class="{ 'selected': navStore.currentPage == 'results', 'link': true }" to="">Mes
                résultats</router-link>
        </div>
        <div id="part_3">
            <div class="profile">
                <div class="zone">
                    <div class="round" @click="navStore.toggleDropdown()">
                        <strong>{{ getUser ? getUser.email.charAt(0).toUpperCase() : "User"
                            }}</strong>
                    </div>
                </div>
                <div v-if="navStore.open" class="dropdown-content">
                    <router-link @click="navStore.closeDropdown()" class="link-dropdown"
                        to="/profile">Profile</router-link>
                    <a class="link-dropdown" @click="navStore.closeDropdown()" href="#">Link 2</a>
                    <a class="link-dropdown" href="#" @click="logout(); navStore.closeDropdown()">Deconnexion</a>
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

</script>