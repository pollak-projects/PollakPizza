<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const pizzas = ref([]);
    const toppings = ref([]);
    const selectedToppings = ref([]);
    const pizzaToppings = ref('');
    const isLoading = ref(false);

    // Fetch pizzas function with optional filtering
    const fetchPizzas = async (selectedToppings = []) => {
      try {
        let endpoint = "http://localhost:3061/allpizzas";

        // Check if selected toppings are provided and update endpoint for filtering
        if (selectedToppings.length > 0) {
          endpoint += `?toppings=${selectedToppings.join(",")}`; // Assuming backend supports query params for filtering
        }

        const response = await axios.get(endpoint);
        pizzas.value = response.data;
      } catch (error) {
        console.error("Error fetching pizzas:", error);
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
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchPizzas(); // Fetch all pizzas on mount
      fetchToppings();
    });

    return {
      pizzas,
      toppings,
      selectedToppings,
      pizzaToppings,
      isLoading,
      fetchPizzas, // Return fetchPizzas so it can be called from the template
    };
  },
};
</script>


<template>
  <body>
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <h2>Ezen az oldalon megtaláljak a pizzáink listáját!</h2>
        </div>
      </section>

      <section id="menu" class="menu">
        <h2>Étlapunk</h2>
        <div class="menuflex">
          <div>
            <h1>Keresés feltét alapján</h1>
          </div>
          <div v-for="topping in toppings" :key="topping.id">
            <div>
            <div class="checkbox-wrapper-18">
            <label :for="`topping-${topping.id}`">{{ topping.name }}</label>
             <div class="round">
              <input type="checkbox" :id="`topping-${topping.id}`" :value="topping.id" v-model="selectedToppings" />
              <label :for="`topping-${topping.id}`"></label>
             </div>
         </div>
        </div>
          </div>
          <button @click="fetchPizzas(selectedToppings)">Keresés</button>
        </div>
        <div class="pizza-list">
          <div v-for="pizza in pizzas" :key="pizza.id" class="pizza-card">
            <img class="previewpizza" :src="pizza.image" alt="Pizza" />
            <h3>{{ pizza.name }}</h3>
            <p>{{ pizza.toppings }}</p>
            <p><strong>{{ pizza.price }} Ft</strong></p>
            <button @click="orderPizza(pizza)">Rendelj most!</button>
          </div>
        </div>
      </section>
    </div>
  </body>
</template>

<style scoped  src="../assets/css/menu.css"></style>