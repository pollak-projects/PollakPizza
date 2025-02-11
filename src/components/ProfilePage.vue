<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userData = ref(null);
const errorMessage = ref('');
const router = useRouter();
const isEditing = ref(false);

const getUserData = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios.get('http://localhost:3061/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      userData.value = response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      errorMessage.value = 'Hiba történt az adatok lekérése során.';
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        router.push({ name: 'Login' });
      }
    }
  } else {
    console.log('No token found');
    errorMessage.value = 'Nincs érvényes token. Kérjük, jelentkezz be újra.';
    router.push({ name: 'Login' });
  }
};

onMounted(() => {
  getUserData();
});
</script>

<template>
  <div class="profile-container">
    <h1 class="profile-title">Profil adatok</h1>
    <div v-if="userData && !isEditing">
      <div class="profile-data">
        <p><strong>Felhasználónév:</strong> {{ userData.name }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <p><strong>Cím:</strong> {{ userData.address }}</p>
        <p><strong>Telefonszám:</strong> {{ userData.phonenumber }}</p>
      </div>
      <button class="edit-button" @click="isEditing = true">Szerkesztés</button>
    </div>
    <div v-if="isEditing">
      <form @submit.prevent="updateUserData" class="edit-form">
        <div>
          <label for="name">Felhasználónév:</label>
          <input type="text" id="name" v-model="userData.name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="userData.email" />
        </div>
        <div>
          <label for="address">Cím:</label>
          <input type="text" id="address" v-model="userData.address" />
        </div>
        <div>
          <label for="phonenumber">Telefonszám:</label>
          <input type="text" id="phonenumber" v-model="userData.phonenumber" />
        </div>
        <button type="submit" class="save-button">Mentés</button>
        <button type="button" class="cancel-button" @click="isEditing = false">Mégse</button>
      </form>
    </div>
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 20px;
  background-color: #000000;
  max-width: 600px;
  margin: 0 auto;
}

.profile-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-data {
  background-color: #0a0a0a;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-data p {
  margin: 10px 0;
  font-size: 16px;
}

.edit-button, .save-button, .cancel-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #dba14a;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button:hover, .save-button:hover, .cancel-button:hover {
  background-color: #b78e3b;
}

.edit-form {
  background-color: #000000;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-form div {
  margin-bottom: 10px;
}

.edit-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.edit-form input {
  width: 100%;
  padding: 8px;
  border: 1px solid #000000;
  border-radius: 4px;
}

.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>