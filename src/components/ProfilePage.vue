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
const userOrders = ref([]); // Felhasználó rendelései
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
      originalUserData.value = { ...response.data };
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

const getUserOrders = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios.get('http://localhost:3061/user-orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      userOrders.value = response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      errorMessage.value = 'Hiba történt a rendelések lekérése során.';
    }
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
      await axios.put('http://localhost:3061/profile', userData.value, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await getUserData();
      isEditing.value = false;
      errorMessage.value = '';
    } catch (error) {
      console.error('Error updating profile:', error);
      errorMessage.value = 'Hiba történt az adatok frissítése során. Próbáld újra!';
    }
  }
};

const cancelEdit = () => {
  userData.value = { ...originalUserData.value };
  isEditing.value = false;
};

onMounted(() => {
  getUserData();
  getUserOrders(); // Rendelések lekérése
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
        <button class="edit-button" @click="isEditing = true">Szerkesztés</button>
      </div>
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
        <div class="row">
          <button type="button" class="cancel-button" @click="cancelEdit">Mégse</button>
          <button type="submit" class="save-button">Mentés</button>
        </div>
      </form>
    </div>
    <!-- Rendelések mindig láthatóak -->
    <h2>Rendeléseid</h2>
    <div v-if="userOrders.length > 0" class="orders-container">
      <ul>
        <li v-for="order in userOrders" :key="order.id">
          <p><strong>Pizza:</strong> {{ order.pizzaName }}</p>
          <p><strong>Méret:</strong> {{ order.size }}</p>
          <p><strong>Darabszám:</strong> {{ order.pizzaNum }}</p>
          <p><strong>Ár:</strong> {{ order.finalPrice }} Ft</p>
          <p><strong>Státusz:</strong> {{ order.status }}</p>
        </li>
      </ul>
    </div>
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped src="../assets/css/profile.css"></style>