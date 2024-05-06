<template>
    <nav>
        <div id="part_1">
            <div>
                Logo
            </div>
        </div>
        <div id="part_2">
            <div>
                <router-link to="/surveys">Mes surveys</router-link>
            </div>
            <div>
                <router-link to="/templates">Mes templates</router-link>
            </div>
            <div>
                <router-link to="">Mes résultats</router-link>
            </div>
        </div>
        <div id="part_3">
            <div>
                <router-link to="/profile">Profil</router-link>
            </div>
            <div>
                <a href="#" @click="logout()">Deconnexion</a>
            </div>
        </div>

    </nav>
</template>

<script setup lang="ts">
import useUserStore from 'src/stores/user';


const userStore = useUserStore()

async function logout() {
    userStore.logout()
}

</script>