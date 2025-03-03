<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const newPassword = ref("");
const isLoading = ref(false);
const message = ref("");

const handleResetPassword = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post(
      `http://localhost:3061/reset-password/${route.params.token}`,
      { newPassword: newPassword.value }
    );
    message.value =
      "A jelszó sikeresen frissítve. Most már bejelentkezhet az új jelszavával.";
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.error("Error resetting password:", error);
    message.value =
      "Hiba történt a jelszó visszaállítása során. Kérjük, próbálja újra.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <body>
    <div class="reset-password-container">
      <h1 class="reset-password-title">Jelszó Visszaállítása</h1>
      <form @submit.prevent="handleResetPassword" class="reset-password-form">
        <label for="newPassword">Új Jelszó</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          placeholder="Új jelszó"
          required
        />
        <button type="submit" class="submit-button" :disabled="isLoading">
          Jelszó Visszaállítása
        </button>
      </form>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </body>
</template>

<style scoped src="../assets/css/resetpass.css"></style>