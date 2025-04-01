<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const searchQuery = ref("");
    const pizzas = ref([]);
    const toppings = ref([]);
    const selectedToppings = ref([]);
    const pizzaToppings = ref("");
    const isLoading = ref(false);

    // Fetch pizzas function with optional filtering
    const fetchPizzas = async (selectedToppings = []) => {
      try {
        let endpoint = "http://localhost:3061/allpizzas";
        console.log(searchQuery.value); // Log the correct value of searchQuery

        // Check if selected toppings are provided and update endpoint for filtering
        if (selectedToppings.length > 0) {
          endpoint += `?toppings=${selectedToppings.join(",")}`; // Assuming backend supports query params for filtering
        }
        if (searchQuery.value) {
          endpoint += selectedToppings.length > 0 ? `&` : `?`; // Add & if toppings exist
          endpoint += `pizzaname=${encodeURIComponent(searchQuery.value)}`; // Append pizza name
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
        const response = await axios.get(
          "http://localhost:3061/admin/allToppings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          toppings.value = response.data;
        } else {
          throw new Error(`Unexpected response code: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching toppings:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchPizzas(); // Fetch all pizzas on mount
      fetchToppings();
    });

    return {
      searchQuery,
      pizzas,
      toppings,
      selectedToppings,
      pizzaToppings,
      isLoading,
      fetchPizzas, // Return fetchPizzas so it can be called from the template
    };
  },
};
const goToOrder = () => {
  router.push("/order");
};
</script>

<template>
  <body>
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <div class="text-content">
            <h2>Pollak Pizza Étlap</h2>
            <p>Ezen az oldalon megtalálják kinálatunkat!</p>
          </div>
          <img class="frontimg" src="../assets/image/pizzaimg.png" alt="Pizza Img" />
        </div>
      </section>

      <section id="menu" class="menu">
        <h2>Pizzáink</h2>
        <div class="menuflex">
          <div>
            <h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pizza
              keresés&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
          </div>
          <div>
            <input
              type="text"
              class="pizzasearchinput"
              v-model="searchQuery"
              placeholder="Keresés pizza névvel"
            />
            <ul>
              <li v-for="pizza in filteredPizzas" :key="pizza.id">
                {{ pizza.name }}
              </li>
            </ul>
          </div>
          <div class="breaker">
          <div v-for="topping in toppings" :key="topping.id">
            <div>
              <div class="checkbox-wrapper-18">
                <div class="round">
                  <input
                    type="checkbox"
                    :id="`topping-${topping.id}`"
                    :value="topping.id"
                    v-model="selectedToppings"
                  />
                  <label
                    class="labeltab"
                    :for="`topping-${topping.id}`"
                  ></label>
                </div>
                <div class="topping-container">
                  <label :for="`topping-${topping.id}`">{{
                    topping.name
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
          <button
            class="searchbtn"
            @click="fetchPizzas(selectedToppings, searchQuery)"
          >
            Keresés
          </button>
        </div>
        <div class="pizza-list">
          <div v-for="pizza in pizzas" :key="pizza.id" class="pizza-card">
            <img class="previewpizza" :src="pizza.image" alt="Pizza" />
            <h3>{{ pizza.name }}</h3>
            <p>{{ pizza.toppings }}</p>
            <p>
              <strong>{{ pizza.price }} Ft</strong>
            </p>
            <button @click="$router.push('/order')">Rendelj most!</button>
          </div>
          <div v-if="pizzas.length === 0">Nincs ilyen pizzánk.</div>
        </div>
      </section>
    </div>
  </body>
</template>

<style scoped src="../assets/css/menu.css"></style>
