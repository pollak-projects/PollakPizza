<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const newPassword = ref('');
const isLoading = ref(false);
const message = ref('');

const handleResetPassword = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post(`http://localhost:3061/reset-password/${route.params.token}`, { newPassword: newPassword.value });
    message.value = 'A jelszó sikeresen frissítve. Most már bejelentkezhet az új jelszavával.';
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  } catch (error) {
    console.error('Error resetting password:', error);
    message.value = 'Hiba történt a jelszó visszaállítása során. Kérjük, próbálja újra.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="reset-password-container">
    <h1 class="reset-password-title">Jelszó Visszaállítása</h1>
    <form @submit.prevent="handleResetPassword" class="reset-password-form">
      <label for="newPassword">Új Jelszó</label>
      <input type="password" id="newPassword" v-model="newPassword" placeholder="Új jelszó" required />
      <button type="submit" class="submit-button" :disabled="isLoading">Jelszó Visszaállítása</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<style scoped>
.reset-password-container {
  padding: 20px;
  background-color: #f7ad45;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.reset-password-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.reset-password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reset-password-form label {
  font-weight: bold;
  color: #fff;
}

.reset-password-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #a0702b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  color: #fff;
  font-weight: bold;
}
</style>