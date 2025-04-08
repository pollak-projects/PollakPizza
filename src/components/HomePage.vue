<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import SlideInFromLeft from '@/components/SlideInFromLeft.vue';
import SlideInFromRight from '@/components/SlideInFromRight.vue';

const pizzas = ref([]);

const router = useRouter();

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fetchPizzas = async () => {
  try {
    const response = await axios.get("http://localhost:3061/allpizzas");
    const shuffledPizzas = shuffleArray(response.data);
    pizzas.value = shuffledPizzas.slice(0, 6); // Limit to 6 pizzas
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

          <SlideInFromLeft>
            <h2>Pollak Pizza Home</h2>
          
            <p>
              Vékony tésztás pizzák, vastag tésztás pizzák, egyedi <br />
              pizzák <span class="specialfont"> otthon(r)a. </span>
            </p>
          </SlideInFromLeft>

          <div class="row">
            <SlideInFromLeft>
              <button @click="goToOrder" class="orderbtn">Rendelés most</button>
            </SlideInFromLeft>
          
            <SlideInFromLeft delay="0.2s">
              <button @click="goToMenu" class="menubtn">Irány az étlap</button>
            </SlideInFromLeft>
          </div>

        </div>
        <SlideInFromRight>
          <img src="../assets/image/pizzaimg.png" alt="Pizza Img" />
        </SlideInFromRight>
      </div>
    </section>

    <section class="textvideo">
      <video autoplay muted loop>
        <source src="../assets/video/bgvideo.mp4" type="video/mp4" />
      </video>
      <div class="text-img">
        <SlideInFromLeft>
          <p>
            A Pollak Pizza a legjobb alapanyagokkal és hagyományos receptúrával
            készíti el ínycsiklandó pizzáit. Gyors rendelés, friss ízek, és gyors
            kiszállítás – mindez azért, hogy a legjobb pizzát élvezhesd
            otthonodban!
          </p>
        </SlideInFromLeft>
      </div>
    </section>

    <section id="menu" class="menu">

      <SlideInFromLeft>
        <h2>Étlapunk</h2>
      </SlideInFromLeft>

      <div class="pizza-list">

        <SlideInFromLeft v-for="pizza in pizzas" :key="pizza.id" class="pizza-card" :delay="`${0.1 * pizzas.indexOf(pizza)}s`">

          <div class="card-top">
            <img class="previewpizza" :src="pizza.image" alt="Pizza" />
          </div>

          <div class="card-bottom">
            <h3>{{ pizza.name }}</h3>
            <p>{{ pizza.toppings }}</p>
            <span>
              <strong>{{ pizza.price }} Ft</strong>
            </span>
            <button @click="goToOrder">Rendelj most!</button>
          </div>

        </SlideInFromLeft>

      </div>
    </section>
  </div>
  <section class="getToOrder">
    <SlideInFromLeft>
      <h1>Rendelés</h1>
      <p>A rendelésed megkezdéséhez, kattints a gombra!</p>
      <button @click="goToOrder">Rendelés megkezdése</button>
    </SlideInFromLeft>
  </section>
</template>




<style scoped src="../assets/css/home.css"></style>