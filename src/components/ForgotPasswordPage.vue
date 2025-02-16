<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const isLoading = ref(false);
const message = ref('');
const router = useRouter();

const handleForgotPassword = async () => {
  console.log("A handleForgotPassword függvény meghívódott!"); // Debug log
  try {
    isLoading.value = true;
    const response = await axios.post('http://localhost:3061/forgot-password', { email: email.value });
    console.log("Válasz a szervertől:", response.data);
    message.value = 'Ellenőrizze az email fiókját!';
  } catch (error) {
    console.error('Hiba történt:', error);
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      message.value = 'Hiba történt. Próbálja újra!';
    }
  } finally {
    isLoading.value = false;
  }
};

const handleBackToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="forgot-password-container">
    <h1 class="forgot-password-title">Elfelejtett jelszó</h1>
    <form @submit.prevent="handleForgotPassword" class="forgot-password-form">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" placeholder="example@pollakpizza.hu" required />
      <button type="submit" class="submit-button" :disabled="isLoading">Küldés</button>
      <button type="button" class="back-button" @click="handleBackToLogin">Vissza</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<style scoped>
.forgot-password-container {
  padding: 20px;
  background-color: #f7ad45;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.forgot-password-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.forgot-password-form label {
  font-weight: bold;
  color: #fff;
}

.forgot-password-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.submit-button, .back-button {
  padding: 10px 20px;
  background-color: #a0702b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:disabled, .back-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  color: #fff;
  font-weight: bold;
}
</style>