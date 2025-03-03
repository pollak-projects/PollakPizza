<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const pizzas = ref([]);

    const fetchPizzas = async () => {
      try {
        const response = await axios.get("http://localhost:3061/allpizzas");
        pizzas.value = response.data;
      } catch (error) {
        console.error("Hiba a pizzák betöltésekor:", error);
      }
    };

    onMounted(() => {
      fetchPizzas();
    });

    return { pizzas, fetchPizzas };
  },
};
</script>
<template>
  <body>
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <h2>Ezen az oldalon megtaláljak a kinílatunkat</h2>
        </div>
      </section>

      <section id="menu" class="menu">
        <h2>Étlapunk</h2>
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