<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const newPassword = ref("");
const newPasswordcheck = ref("");
const isLoading = ref(false);
const message = ref("");
const toast = useToast();

const handleResetPassword = async () => {
  console.log(newPassword, newPasswordcheck)
  if(newPassword.value == newPasswordcheck.value)
  {
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
  }else{
    toast.error("A két jelszó nem egyezik!")
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
          minlength="8"
          placeholder="Új jelszó"
          required
        />
        <label for="newPasswordcheck">Jelszó Ismét</label>
        <input
          type="password"
          id="newPasswordcheck"
          v-model="newPasswordcheck"
          minlength="8"
          placeholder="Jelszó ismét"
          required
        />
        <button type="submit" class="submit-button" :disabled="isLoading">
          Jelszó Visszaállítása
        </button>
      </form>
      <div v-if="message" class="message" style="color: black;">{{ message }}</div>
    </div>
  </body>
</template>

<style scoped src="../assets/css/resetpass.css"></style>