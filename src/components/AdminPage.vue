<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const users = ref([]);
const isLoading = ref(false);
const message = ref('');
const notification = ref(''); // Értesítési üzenet
const showNotification = ref(false); // Értesítési popup láthatósága
const selectedUserOrders = ref([]); // Kiválasztott felhasználó rendelései
const showOrdersModal = ref(false); // Rendelési adatok modal láthatósága

const router = useRouter(); // Router használata

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3061/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    users.value = response.data;
  } catch (error) {
    console.error('Hiba a felhasználók betöltésekor:', error);
    message.value = 'Hiba történt a felhasználók betöltésekor.';
  } finally {
    isLoading.value = false;
  }
};

const fetchUserOrders = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3061/admin/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    selectedUserOrders.value = response.data;
    showOrdersModal.value = true;
  } catch (error) {
    console.error('Hiba a rendelési adatok betöltésekor:', error);
    message.value = 'Hiba történt a rendelési adatok betöltésekor.';
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:3061/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchUsers();
    showNotificationMessage('Felhasználó sikeresen törölve.');
  } catch (error) {
    console.error('Hiba a felhasználó törlésekor:', error);
    message.value = 'Hiba történt a felhasználó törlésekor.';
  }
};

const updateUser = async (user) => {
  try {
    await axios.put(`http://localhost:3061/admin/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchUsers();
    showNotificationMessage('Felhasználó sikeresen módosítva.');
  } catch (error) {
    console.error('Hiba a felhasználó módosításakor:', error);
    message.value = 'Hiba történt a felhasználó módosításakor.';
  }
};

const showNotificationMessage = (msg) => {
  notification.value = msg;
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="admin-page">
    <h1>Admin oldal</h1>
    <div v-if="isLoading">Betöltés...</div>
    <div v-if="message">{{ message }}</div>
    <table v-if="!isLoading && !message">
      <thead>
        <tr>
          <th>ID</th>
          <th>Név</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td><input v-model="user.name" /></td>
          <td><input v-model="user.email" /></td>
          <td>
            <select v-model="user.admin">
              <option :value="1">Igen</option>
              <option :value="0">Nem</option>
            </select>
          </td>
          <td>
            <button @click="updateUser(user)">Mentés</button>
            <button @click="deleteUser(user.id)">Törlés</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/orders" class="orders-link">Rendelések megtekintése</router-link>
    <button @click="router.push('/')">Vissza a kezdőlapra</button>
    <div v-if="showNotification" class="notification-popup">{{ notification }}</div>
  </div>
</template>

<style scoped>
.admin-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #f9f9f9;
}

.admin-page h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #555;
  text-align: left;
  color: #f9f9f9;
}

th {
  background-color: #444;
  color: #f9f9f9;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #f4a83d;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #dba14a;
}

.orders-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #f4a83d;
  text-decoration: none;
  font-weight: bold;
}

.orders-link:hover {
  text-decoration: underline;
}

.notification-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #444;
  color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>