<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const orders = ref([]);
const isLoading = ref(false);
const message = ref("");
const notification = ref("");
const showNotification = ref(false);
const customPizzas = ref([]);

const router = useRouter();

const fetchOrders = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("http://localhost:3061/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    orders.value = response.data;
  } catch (error) {
    console.error("Hiba a rendelési adatok betöltésekor:", error);
    message.value = "Hiba történt a rendelési adatok betöltésekor.";
  } finally {
    isLoading.value = false;
  }
};

const updateOrderStatus = async (orderId) => {
  try {
    await axios.put(
      `http://localhost:3061/orders/${orderId}`,
      { status: "Kész" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchOrders();
    fetchCustomPizzas();
    showNotificationMessage("Rendelés sikeresen frissítve.");
  } catch (error) {
    console.error("Hiba a rendelés frissítésekor:", error);
    message.value = "Hiba történt a rendelés frissítésekor.";
  }
};

const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`http://localhost:3061/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchOrders();
    showNotificationMessage("Rendelés sikeresen törölve.");
  } catch (error) {
    console.error("Hiba a rendelés törlésekor:", error);
    message.value = "Hiba történt a rendelés törlésekor.";
  }
};

const fetchCustomPizzas = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get("http://localhost:3061/customPizzas", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    customPizzas.value = response.data; // Assuming an API route for fetching custom pizzas
  } catch (error) {
    console.error("Hiba az egyedi pizzák betöltésekor:", error);
    message.value = "Hiba történt az egyedi pizzák betöltésekor.";
  } finally {
    isLoading.value = false;
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
  fetchCustomPizzas();
});
</script>

<template>
  <body>
    <div class="orders-page">
      <h1>Rendelések</h1>
      <div v-if="isLoading">Betöltés...</div>
      <div v-if="message">{{ message }}</div>
      <div v-if="!isLoading && !message">
        <h2>Pizza Rendelések</h2>

        <div class="center">
        </div>

        <div class="" id="noOrdersDiv">
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
              <tr
                v-for="order in orders.filter((o) => o.status !== 'Kész')"
                :key="order.id"
              >
                <td>{{ order.id }}</td>
                <td>{{ order.userName }}</td>
                <td>{{ order.pizzaName }}</td>
                <td>{{ order.size }}</td>
                <td>{{ order.address }}</td>
                <td>{{ order.userPhone }}</td>
                <td>{{ order.finalPrice }} Ft</td>
                <td>{{ order.status }}</td>
                <td>
                  <button @click="updateOrderStatus(order.orderId)">Kész</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        

        <div v-if="!isLoading && !message">
          <h2>Egyedi Pizza Rendelések</h2>
          <div v-if="customPizzas.length > 0">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Rendelés ID</th>
                  <th>Felhasználó</th>
                  <th>Méret</th>
                  <th>Feltétek</th>
                  <th>Cím</th>
                  <th>Telefonszám</th>
                  <th>Ár</th>
                  <th>Státusz</th>
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="pizza in customPizzas.filter(
                    (p) => p.status !== 'Kész'
                  )"
                  :key="pizza.orderId"
                >
                  <td>{{ pizza.orderId }}</td>
                  <td>{{ pizza.userName }}</td>
                  <td>{{ pizza.size }}</td>
                  <td>{{ pizza.toppings }}</td>
                  <td>{{ pizza.address }}</td>
                  <td>{{ pizza.userPhone }}</td>
                  <td>{{ pizza.finalPrice }} Ft</td>
                  <td>{{ pizza.status }}</td>
                  <td>
                    <button @click="updateOrderStatus(pizza.orderId)">
                      Kész
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>Nincsenek egyedi pizza rendelések.</p>
          </div>
        </div>

        <h2>Kész Rendelések</h2>

        <div class="center">
        </div>

        <div class="" id="finishedOrdersDiv">
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
              <tr
                v-for="order in orders.filter((o) => o.status === 'Kész')"
                :key="order.id"
              >
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
      </div>
      <div class="backToHomePage">
        <button @click="router.push('/')">Vissza a kezdőlapra</button>
      </div>
      <div v-if="showNotification" class="notification-popup">
        {{ notification }}
      </div>
    </div>
  </body>
</template>

<style scoped src="../assets/css/orders.css"></style>
