<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const isLoading = ref(false);
const message = ref("");
const router = useRouter();

const handleForgotPassword = async () => {
  console.log("A handleForgotPassword függvény meghívódott!"); // Debug log
  try {
    isLoading.value = true;
    const response = await axios.post("http://localhost:3061/forgot-password", {
      email: email.value,
    });
    console.log("Válasz a szervertől:", response.data);
    message.value = "Ellenőrizze az email fiókját!";
  } catch (error) {
    console.error("Hiba történt:", error);
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      message.value = "Hiba történt. Próbálja újra!";
    }
  } finally {
    isLoading.value = false;
  }
};

const handleBackToLogin = () => {
  router.push("/login");
};
</script>
<template>
  <div class="forgot-password-wrapper">
    <div class="forgot-password-container">
      <h1 class="forgot-password-title">Elfelejtett jelszó</h1>
      <p class="forgot-password-subtitle">
        Adja meg az email címét, és küldünk egy helyreállítási linket.
      </p>

      <form @submit.prevent="handleForgotPassword" class="forgot-password-form">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="example@pollakpizza.hu"
          required
        />

        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? "Küldés..." : "Küldés" }}
        </button>
        <button type="button" class="back-button" @click="handleBackToLogin">
          Vissza
        </button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/forgotpass.css"></style>