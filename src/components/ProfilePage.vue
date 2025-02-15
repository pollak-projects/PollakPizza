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

<style scoped>
.profile-container {
  padding: 5dvw;
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 0%,
    rgb(255, 231, 152) 20%
  );
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-title {
  margin-top: 5dvw;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #8b5e3b;
}

.profile-data {
  background-color: rgba(247, 173, 69, 0.5);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-data p {
  margin: 10px 0;
  font-size: 16px;
  color: #8b5e3b;
}

.edit-button, .save-button, .cancel-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #a0702b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  margin-bottom: 10.2dvw;
}

.edit-button:hover, .save-button:hover, .cancel-button:hover {
  background-color: #e6953b;
}

.edit-form-container {
  width: 100%;
  padding: 20px;
  background-color: rgba(247, 173, 69, 0.5);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.edit-form div {
  margin-bottom: 10px;
}

.edit-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #8b5e3b;
}

.edit-form input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}

input {
  color: #8b5e3b;
}
</style>