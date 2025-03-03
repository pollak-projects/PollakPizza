<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const pizzas = ref([]);

const router = useRouter();


const fetchPizzas = async () => {
  try {
    const response = await axios.get("http://localhost:3061/pizzas");
    pizzas.value = response.data;
  } catch (error) {
    console.error("Hiba a pizzák betöltésekor:", error);
  }
};

onMounted(() => {
  fetchPizzas();
});


const goToOrder = () => {
  router.push("/order");
};

const goToMenu = () => {
  router.push("/menu");
};
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <div class="text-content">
          <h2>Pollak Pizza Home</h2>
          <p>
            Vékony tésztás pizzák, vastag tésztás pizzák, egyedi <br />
            pizzák <span class="specialfont"> otthon(r)a </span>
          </p>
          <button @click="goToOrder" class="orderbtn">Rendelés most</button>
          <button @click="goToMenu" class="menubtn">Irány az étlap</button>
        </div>
        <img src="../assets/image/pizzaimg.png" alt="Pizza Img" />
      </div>
    </section>

    <section class="textvideo">
      <video autoplay muted loop>
        <source src="../assets/video/bgvideo.mp4" type="video/mp4" />
      </video>
      <div class="text-asd">
        <p>
          A Pollak Pizza a legjobb alapanyagokkal és hagyományos receptúrával
          készíti el ínycsiklandó pizzáit. Gyors rendelés, friss ízek, és gyors
          kiszállítás – mindez azért, hogy a legjobb pizzát élvezhesd
          otthonodban!
        </p>
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
          <button>Rendelj most!</button>
        </div>
      </div>
    </section>
  </div>
  <section class="getToOrder">
    <div>
      <h1>Rendelés</h1>
      <br />
      <p>A rendelésed megkezdéséhez, kattints a gombra!</p>
      <br />
      <button @click="goToOrder">Rendelés megkezdése</button>
    </div>
  </section>
</template>

<style scoped src="../assets/css/home.css"></style>