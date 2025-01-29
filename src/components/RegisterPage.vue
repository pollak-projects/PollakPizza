<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


const registname = ref('')
const registemail = ref('')
const registpassword = ref('')
const registbirth = ref('')
const registaddress = ref('')
const registadmin = ref(0)
const registphone = ref('')
const router = useRouter()

const goToLogin = () => {
  router.push('/')
}

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:3061/register', {
      name: registname.value,
      email: registemail.value,
      password: registpassword.value,
      birthdate: registbirth.value,
      address: registaddress.value,
      admin: registadmin.value,
      phonenumber: registphone.value
    })
    console.log('Registration successful:', response.data)
    router.push('/')  // Ha sikeres a regisztráció, irány a login oldal
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Regisztráció</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="name">Név</label>
          <input type="text" id="name" placeholder="Írd be a neved címed" v-model="registname" />
        </div>
        <div class="input-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" placeholder="Írd be az email címed" v-model="registemail" />
        </div>
        <div class="input-group">
          <label for="password">Jelszó</label>
          <input type="password" id="password" placeholder="Írd be a jelszót" v-model="registpassword" />
        </div>
        <div class="input-group">
          <label for="date">Születési dátum</label>
          <input type="date" id="date" placeholder="Adja meg a születési dátumát" v-model="registbirth" />
        </div>
        <div class="input-group">
          <label for="address">Címed</label>
          <input type="text" id="address" placeholder="Adja meg a címét" v-model="registaddress" />
        </div>
        <div class="input-group">
          <label for="phone">Telefonszám</label>
          <input type="text" id="phonenumber" placeholder="Írd be a telefonszámod" v-model="registphone" />
        </div>
        <button type="submit" class="primary-btn">Regisztráció</button>
      </form>
      <div class="actions">
        <button @click="goToLogin" class="link-btn">Már van fiókja?</button>
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
  color: black;
  border-radius: 8px;
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
