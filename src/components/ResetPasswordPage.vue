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

<style scoped>
body {
  background: linear-gradient(135deg, #ff9a3c, #ff6a00);
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-y: hidden !important;
}
.reset-password-container {
  padding: 20px;
  background-color: white;
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.reset-password-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
}

.reset-password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Labels */
.reset-password-form label {
  font-weight: bold;
  color: black;
  text-align: left;
  display: block;
}

/* Input Field */
.reset-password-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.reset-password-form input:focus {
  border-color: #a0702b;
  box-shadow: 0 0 8px rgba(160, 112, 43, 0.5);
}

/* Button (Same as Forgot Password Page) */
.submit-button {
  padding: 10px 20px;
  background-color: #ff6a00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.submit-button:hover {
  background-color: #8b5e26;
  transform: scale(1.05);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

/* Message */
.message {
  margin-top: 20px;
  color: #fff;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  animation: fadeIn 0.5s ease-in-out;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
