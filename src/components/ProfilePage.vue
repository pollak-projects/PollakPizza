<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userData = ref(null);
const errorMessage = ref('');
const router = useRouter();

const getUserData = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios.get('http://localhost:3061/profile', {
        headers: {
          'Authorization': `Bearer ${token}`, // A token küldése
        },
      });
      userData.value = response.data; // Adatok beállítása
    } catch (error) {
      console.error('Error fetching profile:', error);
      errorMessage.value = 'Hiba történt az adatok lekérése során.';
      // Hibakezelés, például átirányítás a bejelentkezési oldalra, ha a token érvénytelen
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        router.push({ name: 'Login' }); // Ha 401-et kapunk, átirányítás a bejelentkezéshez
      }
    }
  } else {
    console.log('No token found');
    errorMessage.value = 'Nincs érvényes token. Kérjük, jelentkezz be újra. ';
    router.push({ name: 'Login' });
  }
};

onMounted(() => {
  getUserData(); // Profiladatok betöltése, amikor az oldal betöltődött
});
</script>

<template>
  <div>
    <h1>Profil adatok</h1>
    <div v-if="userData">
      <p><strong>Felhasználónév:</strong> {{ userData.name }}</p>
      <p><strong>Email:</strong> {{ userData.email }}</p>
      <p><strong>Cím:</strong> {{ userData.address }}</p>
      <p><strong>Telefonszám:</strong> {{ userData.phonenumber }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  padding: 20px;
  background-color: #f4f4f4;
  max-width: 600px;
  margin: 0 auto;
}

.profile-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-data {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-data p {
  margin: 10px 0;
  font-size: 16px;
}

.logout-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #dba14a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #b78e3b;
}

.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>