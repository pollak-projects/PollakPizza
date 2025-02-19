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
          <p>
            <strong>{{ pizza.price }} Ft</strong>
          </p>
          <button @click="orderPizza(pizza)">Rendelj most!</button>
        </div>
      </div>
    </section>
  </div>
  </body>
</template>

<style scoped>
body{
  background-color: rgb(255, 231, 152);
  height: 100%;
}
a.active {
  font-weight: bold;
  border-bottom: 2px solid #fae4df; 
  padding-bottom: 5px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

header h1 {
  margin: 0;
}

header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

header nav ul li {
  margin-right: 10px;
  position: relative;
}

header nav ul li a {
  color: #fff;
  text-decoration: none;
}

header nav ul li.active a {
  font-weight: bold;
}

header nav ul li.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff; 
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
img {
  max-height: 185px;
  border-radius: 30px;
  border: grey solid 2px;
}
.home {
  padding-bottom: 5dvw;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.header h1 {
  margin: 0;
}

.header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.header nav ul li {
  margin-right: 10px;
}

.header nav ul li a {
  color: #fff;
  text-decoration: none;
}

.hero {
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}

.hero h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  margin-bottom: 40px;
}

.hero button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}

.menu {
  text-align: center;
  color: black;
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 0%,
    rgb(255, 231, 152) 40%
  );
}


.menu h2 {
  font-size: 36px;
  margin-bottom: 20px;
}


.pizza-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Alapértelmezett: 3 oszlop */
  gap: 20px;
  justify-content: center;
  padding-left: 20dvw;
  padding-right: 20dvw;
}

/* Tablet nézet (max 1024px) - 2 oszlop */
@media (max-width: 1024px) {
  .pizza-list {
    grid-template-columns: repeat(2, 1fr); /* 2 oszlop */
  }
}

/* Mobil nézet (max 768px) - 1 oszlop */
@media (max-width: 768px) {
  .pizza-list {
    grid-template-columns: repeat(1, 1fr); /* 1 oszlop */
    padding-left: 5vw;
    padding-right: 5vw;
  }
}


.pizza-card h3 {
  font-size: 2dvw;
  margin-bottom: 10px;
}

.pizza-card p {
  font-size: 1dvw;
  margin-bottom: 0.4dvw;
}

.pizza-card {
  display: flex;
  flex-direction: column; /* Stack items properly */
  justify-content: space-between; /* Spread items evenly */
  width: 30%;
  border: 1px solid #d9983d;
  border-radius: 10px;
  font-weight: bold;
  background-color: rgba(247, 173, 69, 0.5);
  padding: 1.3dvw;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #a0702b;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pizza-card button {
  padding: 1dvw 2dvw;
  font-size: 1dvw;
  background-color: #f7ad45;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center; /* Ensures it stays centered */
  width: 80%; /* Prevents it from being too wide */
  margin-top: auto; /* Pushes the button to the bottom */
}
.pizza-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns per row */
  gap: 20px; /* Space between pizza cards */
  justify-content: center;
  padding-left: 20dvw;
  padding-right: 20dvw;
}

.pizza-card {
  width: 100%; /* Ensure cards take up equal space */
  border: 1px solid #d9983d;
  border-radius: 10px;
  font-weight: bold;
  background-color: rgba(247, 173, 69, 0.5);
  padding: 1.3dvw;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #a0702b;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pizza-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.pizza-card img {
  height: 50%;
  width: 100%;
  height: 60%;
}

.pizza-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1dvw;
}

.pizza-card p {
  font-size: 1dvw;
  margin-bottom: 1dvw;
}

.pizza-card button {
  padding: 1dvw 2dvw;
  font-size: 1rem;
  background-color: #f7ad45;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

</style>
