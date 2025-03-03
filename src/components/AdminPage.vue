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
    const response = await axios.get('http://localhost:3061/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
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

onMounted(() => {
  fetchUsers();
  fetchPizzas();
  fetchToppings(); // Fetch the toppings
});

</script>

<template>
  <div class="admin-page">
    <h1>Admin oldal</h1>
    <div v-if="isLoading">Betöltés...</div>
    <div v-if="message">{{ message }}</div>
    
    <!-- Users Table -->
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

    <!-- Pizzas Table -->
    <h2>Pizzák kezelése</h2>
<table v-if="!isLoading && !message">
  <thead>
    <tr>
      <th>ID</th>
      <th>Név</th>
      <th>Ár</th>
      <th>Kép URL</th>
      <th>Feltétek</th>
      <th>Műveletek</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="pizza in pizzas" :key="pizza.id">
      <td>{{ pizza.id }}</td>
      <td><input v-model="pizza.name" /></td>
      <td><input v-model="pizza.price" /></td>
      <td><input v-model="pizza.image" /></td>
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


    
    <button @click="showAddPizzaModal = true">Új pizza hozzáadása</button>
    <div v-if="showAddPizzaModal" class="modal">
      <div class="modal-content">
        <h2>Új pizza hozzáadása</h2>
        <label for="name">Név:</label>
        <input id="name" v-model="pizzaName" />
        <label for="price">Ár:</label>
        <input id="price" v-model="pizzaPrice" />
        <label for="image">Kép URL:</label>
        <input id="image" v-model="pizzaImage" />
        <label for="toppings">Feltétek:</label>
        <div v-for="topping in toppings" :key="topping.id">
          <input type="checkbox" :id="`topping-${topping.id}`" :value="topping.id" v-model="selectedToppings" />
          <label :for="`topping-${topping.id}`">{{ topping.name }}</label>
        </div>

        <button @click="addPizza">Pizza hozzáadása</button>
        <button @click="showAddPizzaModal = false">Mégse</button>
      </div>
    </div>
    
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

/* Modal styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.modal-content h2 {
  color: #f9f9f9;
  margin-bottom: 20px;
}

.modal-content label {
  color: #f9f9f9;
  display: block;
  margin-bottom: 5px;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #444;
  color: #f9f9f9;
}

.modal-content button {
  margin-right: 5px;
  padding: 10px;
  background-color: #f4a83d;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #dba14a;
}
</style>
