<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const registemail = ref('')
const registpassword = ref('')
const router = useRouter()

// Handle login logic here
const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3061/login', {
      email: registemail.value,
      password: registpassword.value
    })

    console.log('Login successful:', response.data)

    // Token tárolása a localStorage-ban (vagy sessionStorage)
    localStorage.setItem('token', response.data.token)

    // Átirányítás a főoldalra
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message)
  }
}

// Navigate to register page
const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Bejelentkezés</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" placeholder="Írd be az email címed" v-model="registemail" />
        </div>
        <div class="input-group">
          <label for="password">Jelszó</label>
          <input type="password" id="password" placeholder="Írd be a jelszót" v-model="registpassword" />
        </div>
        <button type="submit" class="primary-btn">Bejelentkezés</button>
      </form>
      <div class="actions">
        <button @click="goToRegister" class="secondary-btn">Regisztráció</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: transform 0.3s ease;
}

h2 {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
  color: black;
}

label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  color: black;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #2575fc;
}

button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.primary-btn {
  background-color: #2575fc;
  color: white;
  font-weight: bold;
}

.primary-btn:hover {
  background-color: #1a5bb8;
}

.secondary-btn {
  background-color: #f1f1f1;
  color: #2575fc;
}

.secondary-btn:hover {
  background-color: #e0e0e0;
}

.link-btn {
  background: none;
  color: #2575fc;
  font-size: 14px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
}

.link-btn:hover {
  text-decoration: underline;
}

.actions {
  margin-top: 10px;
}
</style>
