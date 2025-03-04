<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const toppings = ref([]);
const users = ref([]);
const pizzas = ref([]);
const isLoading = ref(false);
const message = ref('');
const notification = ref('');
const showNotification = ref(false);
const selectedUserOrders = ref([]);
const showOrdersModal = ref(false);
const selectedToppings = ref([]);

const pizzaName = ref('');
const pizzaPrice = ref('');
const pizzaImage = ref('');
const pizzaToppings = ref('');
const showAddPizzaModal = ref(false);

const router = useRouter();

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    console.log('Fetching users...'); // Add log
    const response = await axios.get('http://localhost:3061/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('Users fetched:', response.data); // Add log
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    message.value = 'Error fetching users';
  } finally {
    isLoading.value = false;
  }
};

const fetchToppings = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3061/admin/allToppings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.status === 200) {
      toppings.value = response.data;
      console.log('Toppings fetched successfully:', toppings.value);
    } else {
      throw new Error(`Unexpected response code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching toppings:', error);
    message.value = 'Error fetching toppings';
  } finally {
    isLoading.value = false;
  }
};

const fetchPizzas = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get('http://localhost:3061/admin/allPizzas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    pizzas.value = response.data;
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    message.value = 'Error fetching pizzas';
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
    console.error('Error fetching orders:', error);
    message.value = 'Error fetching orders';
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
    showNotificationMessage('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    message.value = 'Error deleting user';
  }
};

const deletePizza = async (pizzaId) => {
  try {
    await axios.delete(`http://localhost:3061/admin/deletePizza/${pizzaId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchPizzas(); // Fetch updated list of pizzas
    showNotificationMessage('Pizza deleted successfully');
  } catch (error) {
    console.error('Error deleting pizza:', error);
    message.value = 'Error deleting pizza';
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
    showNotificationMessage('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    message.value = 'Error updating user';
  }
};

const togglePizzaTopping = (pizza, toppingId) => {
  if (!Array.isArray(pizza.toppings)) {
    pizza.toppings = [];
  }

  const topping = toppings.value.find(t => t.id === toppingId);
  if (topping) {
    const toppingName = topping.name;
    if (pizza.toppings.includes(toppingName)) {
      pizza.toppings = pizza.toppings.filter(t => t !== toppingName);
    } else {
      pizza.toppings.push(toppingName);
    }
  }
};

const addPizza = async () => {
  try {
    const selectedToppingsNames = selectedToppings.value.map(id => {
      const topping = toppings.value.find(topping => topping.id === id);
      return topping ? topping.name : null;
    }).filter(name => name !== null);

    await axios.post('http://localhost:3061/admin/addPizza', {
      name: pizzaName.value,
      price: pizzaPrice.value,
      image: pizzaImage.value,
      toppings: selectedToppingsNames,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    showNotificationMessage('Pizza added successfully');
    clearPizzaForm();
  } catch (error) {
    console.error('Error adding pizza:', error);
    message.value = 'Error adding pizza';
  }
};

const updatePizza = async (pizza) => {
  try {
    if (!Array.isArray(pizza.toppings)) {
      pizza.toppings = [];
    }

    await axios.put(`http://localhost:3061/admin/updatePizza/${pizza.id}`, {
      name: pizza.name,
      price: pizza.price,
      image: pizza.image,
      toppings: pizza.toppings,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchPizzas();
    showNotificationMessage('Pizza updated successfully');
  } catch (error) {
    console.error('Error updating pizza:', error);
    message.value = 'Error updating pizza';
  }
};

const showNotificationMessage = (msg) => {
  notification.value = msg;
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

const clearPizzaForm = () => {
  pizzaName.value = '';
  pizzaPrice.value = '';
  pizzaImage.value = '';
  pizzaToppings.value = '';
  showAddPizzaModal.value = false;
};

const showUsers = () => {
  const usersDiv = document.getElementById("usersDiv")
  const usersArrow = document.getElementById("usersArrow")

  if (usersDiv.classList.contains("hidden")) {
    usersDiv.classList.remove("hidden")
    usersArrow.src = "src/assets/image/arrow-down.png"
  }
  else {
    usersDiv.classList.add("hidden")
    usersArrow.src = "src/assets/image/arrow.png"
  }
};

const showPizzas = () => {
  const pizzasDiv = document.getElementById("pizzasDiv")
  const pizzasArrow = document.getElementById("pizzasArrow")

  if (pizzasDiv.classList.contains("hidden")) {
    pizzasDiv.classList.remove("hidden")
    pizzasArrow.src = "src/assets/image/arrow-down.png"
  }
  else {
    pizzasDiv.classList.add("hidden")
    pizzasArrow.src = "src/assets/image/arrow.png"
  }
};

onMounted(() => {
  fetchUsers();
  fetchPizzas();
  fetchToppings(); // Fetch the toppings
});

</script>


<template>
  <body>
    

  <div class="admin-page">
    <h1>Admin oldal</h1>
    <div v-if="isLoading">Betöltés...</div>
    <div v-if="message">{{ message }}</div>

    <!-- Users Table -->
      <h2>Felhasználók kezelése</h2>
      <div class="center">
        <img src="../assets/image/arrow.png" alt="" @click="showUsers()" id="usersArrow">
      </div>
      <div class="users hidden" id="usersDiv">
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
      </div>

    <!-- Pizzas Table -->
      <br>
      <h2>Pizzák kezelése</h2>
      <div class="center">
        <img src="../assets/image/arrow.png" alt="" @click="showPizzas()" id="pizzasArrow">
      </div>
      <div class="pizzas hidden" id="pizzasDiv">
      <table v-if="!isLoading && !message">
      <thead>
        <tr>
          <th>ID</th>
          <th>Név</th>
          <th>Ár</th>
          <th class="kepurl">Kép URL</th>
          <th>Feltétek</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pizza in pizzas" :key="pizza.id">
          <td>{{ pizza.id }}</td>
          <td><input v-model="pizza.name" /></td>
          <td><input v-model="pizza.price" /></td>
          <td><input class="pizzaurl" v-model="pizza.image" /></td>
          <td>
            <div v-for="topping in toppings" :key="topping.id">
              <input
                type="checkbox"
                :id="`topping-${topping.id}-${pizza.id}`"
                :value="topping.id"
                :checked="pizza.toppings && pizza.toppings.includes(topping.name)"
                @change="togglePizzaTopping(pizza, topping.id)"
              />
              <label :for="`topping-${topping.id}-${pizza.id}`">{{ topping.name }}</label>
            </div>
          </td>
          <td>
            <button @click="updatePizza(pizza)">Mentés</button>
            <button @click="deletePizza(pizza.id)">Törlés</button>
          </td>
        </tr>
      </tbody>
      </table>
      <br>
      <button @click="showAddPizzaModal = true">Új pizza hozzáadása</button>
      <div v-if="showAddPizzaModal" class="model">
      <div class="model-content">
        <br>
        <h2>Új pizza hozzáadása</h2>
        <label for="name">Név:</label>
        <input id="name" v-model="pizzaName" />
        <label for="price">Ár:</label>
        <input id="price" v-model="pizzaPrice" />
        <label for="image">Kép URL:</label>
        <input id="image" v-model="pizzaImage" />
        <br>
        <label for="toppings"><strong>Feltétek:</strong></label>
        <br>
        <br>
        <div v-for="topping in toppings" :key="topping.id">
          <div class="checkbox-wrapper-18">
            <label :for="`topping-${topping.id}`">{{ topping.name }}</label>
             <div class="round">
              <input type="checkbox" :id="`topping-${topping.id}`" :value="topping.id" v-model="selectedToppings" />
              <label :for="`topping-${topping.id}`"></label>
             </div>
         </div>
        </div>

        <br>
        <button @click="addPizza">Pizza hozzáadása</button>
        <button @click="showAddPizzaModal = false">Mégse</button>
      </div>
      </div>
    </div>

    <router-link to="/orders" class="orders-link">Rendelések megtekintése</router-link>
    <div class="backToHomePage">
      <button @click="router.push('/')">Vissza a kezdőlapra</button>
    </div>
    <div v-if="showNotification" class="notification-popup">{{ notification }}</div>
  </div>
  </body>
</template>


<style scoped src="../assets/css/admin.css"></style>