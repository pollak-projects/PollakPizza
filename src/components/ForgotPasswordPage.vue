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

<style scoped>
.forgot-password-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  color: black;
  transition: border 0.3s ease;
}

.forgot-password-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a3c, #ff6a00);
  padding: 20px;
}

.forgot-password-container {
  padding: 30px;
  background: #fff;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.forgot-password-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.forgot-password-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.forgot-password-form label {
  font-weight: bold;
  color: #444;
  text-align: left;
}

.forgot-password-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s ease;
}

.forgot-password-form input:focus {
  border-color: #ff6a00;
  outline: none;
}

.submit-button,
.back-button {
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.submit-button {
  background: #ff6a00;
  color: white;
  border: none;
}

.submit-button:hover {
  background: #e65c00;
}

.back-button {
  background: #ddd;
  color: #333;
  border: none;
  margin-top: 8px;
}

.back-button:hover {
  background: #ccc;
}

.submit-button:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  font-weight: bold;
  color: #e65c00;
}
</style>
