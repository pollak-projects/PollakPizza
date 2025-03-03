<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const orders = ref([]);
const isLoading = ref(false);
const message = ref('');
const notification = ref(''); // Értesítési üzenet
const showNotification = ref(false); // Értesítési popup láthatósága

const router = useRouter(); // Router használata

const fetchOrders = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3061/orders', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    orders.value = response.data;
  } catch (error) {
    console.error('Hiba a rendelési adatok betöltésekor:', error);
    message.value = 'Hiba történt a rendelési adatok betöltésekor.';
  } finally {
    isLoading.value = false;
  }
};

const updateOrderStatus = async (orderId) => {
  try {
    await axios.put(`http://localhost:3061/orders/${orderId}`, { status: 'Kész' }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchOrders(); // Frissítjük a rendelési adatokat
    showNotificationMessage('Rendelés sikeresen frissítve.');
  } catch (error) {
    console.error('Hiba a rendelés frissítésekor:', error);
    message.value = 'Hiba történt a rendelés frissítésekor.';
  }
};

const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`http://localhost:3061/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchOrders(); // Frissítjük a rendelési adatokat
    showNotificationMessage('Rendelés sikeresen törölve.');
  } catch (error) {
    console.error('Hiba a rendelés törlésekor:', error);
    message.value = 'Hiba történt a rendelés törlésekor.';
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
  fetchOrders();
});
</script>

<template>
  <div class="orders-page">
    <h1>Rendelések</h1>
    <div v-if="isLoading">Betöltés...</div>
    <div v-if="message">{{ message }}</div>
    <div v-if="!isLoading && !message">
      <h2>Nem kész rendelések</h2>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Rendelés ID</th>
            <th>Felhasználó</th>
            <th>Pizza</th>
            <th>Méret</th>
            <th>Cím</th>
            <th>Telefonszám</th>
            <th>Ár</th>
            <th>Státusz</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders.filter(o => o.status !== 'Kész')" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userName }}</td>
            <td>{{ order.pizzaName }}</td>
            <td>{{ order.size }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.userPhone }}</td>
            <td>{{ order.finalPrice }} Ft</td>
            <td>{{ order.status }}</td>
            <td>
              <button @click="updateOrderStatus(order.id)">Kész</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Kész rendelések</h2>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Rendelés ID</th>
            <th>Felhasználó</th>
            <th>Pizza</th>
            <th>Méret</th>
            <th>Cím</th>
            <th>Telefonszám</th>
            <th>Ár</th>
            <th>Státusz</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders.filter(o => o.status === 'Kész')" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userName }}</td>
            <td>{{ order.pizzaName }}</td>
            <td>{{ order.size }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.userPhone }}</td>
            <td>{{ order.finalPrice }} Ft</td>
            <td>{{ order.status }}</td>
            <td>
              <button @click="deleteOrder(order.id)">Törlés</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="router.push('/')">Vissza a kezdőlapra</button>
    <div v-if="showNotification" class="notification-popup">{{ notification }}</div>
  </div>
</template>

<style scoped src="../assets/css/orders.css"></style>