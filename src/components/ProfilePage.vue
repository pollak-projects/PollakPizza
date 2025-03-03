<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userData = ref({
  name: '',
  email: '',
  address: '',
  phonenumber: ''
});
const originalUserData = ref({});
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
      originalUserData.value = { ...response.data }; // Mentjük az eredeti adatokat
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

const updateUserData = async () => {
  const token = localStorage.getItem('token');

  if (!userData.value.name || !userData.value.email || !userData.value.address || !userData.value.phonenumber) {
    errorMessage.value = 'Minden mezőt ki kell tölteni.';
    return;
  }

  if (token) {
    try {
      const response = await axios.put('http://localhost:3061/profile', userData.value, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // Sikeres frissítés után újra lekérjük az adatokat
      await getUserData();  // Újra lekérjük a legfrissebb adatokat
      isEditing.value = false;
      errorMessage.value = '';  // Töröljük az esetleges hibát
    } catch (error) {
      console.error('Error updating profile:', error);
      errorMessage.value = 'Hiba történt az adatok frissítése során. Próbáld újra!';
      
    }
  }
};

const cancelEdit = () => {
  userData.value = { ...originalUserData.value }; // Visszaállítjuk az eredeti adatokat
  isEditing.value = false;
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
    <div v-if="isEditing" class="edit-form-container">
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
        <button type="button" class="cancel-button" @click="cancelEdit">Mégse</button>
      </form>
    </div>
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped src="../assets/css/profile.css"></style>