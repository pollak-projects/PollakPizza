<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const pizzas = ref([]);

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

const orderPizza = (pizza) => {
  alert(`A ${pizza.name} pizzát adtad hozzá a rendeléshez!`);
};

const goToOrder = () => {
  router.push("/order");
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
          <button @click="scrollToMenu" class="menubtn">Irány az étlap</button>
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
          <button @click="orderPizza(pizza)">Rendelj most!</button>
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

<style scoped>
.getToOrder {
  height: 20dvw;
  font-size: 1.7dvw;
  background-position: center;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #a0702b;
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 0%,
    rgb(255, 231, 152) 20%
  );
}
.getToOrder button {
  padding: 1dvw 1.75dvw;
  font-size: 1.2dvw;
  background-color: #f7ad45;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.previewpizza {
  height: 50%;
  width: 100%;
}
.menu {
  color: black;
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 0%,
    rgb(255, 231, 152) 40%
  );
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

.textvideo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vw;
  overflow: hidden;
}
.text-asd {
  text-align: center;
  font-size: 1.5dvw;
  color: white;
  font-weight: bold;
  padding: 2dvw;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  max-width: 70%;
  opacity: 1;
  transform: translateY(0);
  z-index: 2;
}

.textvideo {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 30dvw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.textvideo video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.textvideo .text-content {
  position: relative;
  z-index: 1;
  font-size: 3.3dvh;
  font-weight: bold;
  color: rgb(255, 255, 255);
  padding: 20px;
  margin-right: 50%;
  margin-left: 10%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.textvideo p {
  word-wrap: break-word;
}
.specialfont {
  background: linear-gradient(to right, #5f8d37, #bb3e00);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
.menubtn {
  background-color: rgba(247, 173, 69, 0.3);
  border: #f7ad45 solid 0.2dvw;
  border-radius: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.7dvw 3.3dvw;
  color: #f7ad45;
}
.orderbtn {
  background-color: #f7ad45;
  border: #f7ad45 solid 0.2dvw;
  border-radius: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.7dvw 3.3dvw;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
img {
  border-radius: 30px;
}
.hero {
  background-size: cover;
  background-position: center;
  height: 30dvw;
  display: flex;
  padding-left: 22dvw;
  align-items: center;
  background: radial-gradient(
    circle,
    rgb(255, 255, 255) 0%,
    rgb(255, 231, 152) 40%
  );
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.hero img {
  height: 35dvw;
  width: 25dvw;
  max-height: 500px;
  border-radius: 30px;
  padding-left: 3dvw;
}

.hero-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.hero h2 {
  font-size: 4dvw;
  color: #9b6600;
}

.hero p {
  font-size: 1dvw;
  margin-bottom: 2dvw;
  padding-left: 2.5dvw;
  color: #9b6600;
  font-weight: bold;
}

.hero button {
  font-size: 1dvw;
  cursor: pointer;
  margin: 0.2dvw;
  font-weight: bold;
  margin-left: 2dvw;
}

.menu {
  text-align: center;
  padding: 20px;
}

.menu h2 {
  font-size: 3dvw;
  margin-bottom: 20px;
}

.pizza-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

.order {
  text-align: center;
  padding: 20px;
}

.order h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.order form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}

.order form label {
  margin-bottom: 10px;
}

.order form input,
.order form select {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.order form button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}

.order form button:hover {
  background-color: #555;
}

.order form button:active {
  background-color: #777;
}
</style>
