<!-- eslint-disable no-unused-vars -->
<script>
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();


export default {
  data() {
    return {
      pizzas: [], // Itt tároljuk a betöltött pizzákat
      order: {
        name: "",
        pizza: "",
        address: "",
      },
    };
  },
  mounted() {
    this.fetchPizzas(); // Betöltjük a pizzákat az oldal betöltődésekor
  },
  methods: {
    // API hívás a pizzák lekérésére
    fetchPizzas() {
      fetch("http://localhost:3061/pizzas")  // Itt állítsd be az API végpontot
        .then((response) => response.json())
        .then((data) => {
          this.pizzas = data;  // Az adatokat az állapotba mentjük
        })
        .catch((error) => {
          console.error("Hiba a pizzák betöltésekor:", error);
        });
    },

    scrollToMenu() {
      const menuSection = document.getElementById("menu");
      menuSection.scrollIntoView({ behavior: "smooth" });
    },

    orderPizza(pizza) {
      this.order.pizza = pizza.name;
      alert(`A ${pizza.name} pizzát adtad hozzá a rendeléshez!`);
    },

    goToOrder() {
      this.$router.push("/order");
    },

    submitOrder() {
      alert(`Köszönjük a rendelésed, ${this.order.name}!`);
      console.log(this.order);
      // Itt lehetne API hívást tenni rendelés küldéséhez
    },
  },
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
          <p>{{ pizza.description }}</p>
          <p>
            <strong>{{ pizza.price }} Ft</strong>
          </p>
          <button @click="orderPizza(pizza)">Rendelj most!</button>
        </div>
      </div>
    </section>

    <section id="order" class="order">
      <h2>Rendelés</h2>

    </section>
  </div>
  <section class="getToOrder">
    <div>
      <h1>Rendelés</h1>
      <br>
      <p>A rendelésed megkezdéséhez, kattints a gombra!</p>
      <br>
      <button>Rendelés megkezdése</button>
    </div>
  </section>
</template>

<style scoped>
.menu{
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
  padding: 15px;
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
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.pizza-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.pizza-card p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.pizza-card button {
  padding: 10px 20px;
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
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  padding: 2rem;
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
  border: #f7ad45 solid 3px;
  border-radius: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.7dvw 3.3dvw;
  color: #f7ad45;
}
.orderbtn {
  background-color: #f7ad45;
  border: #f7ad45 solid 2px;
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
  height: 40dvw;
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
  font-size: 70px;
  color: #9b6600;
}

.hero p {
  font-size: 18px;
  margin-bottom: 2dvw;
  padding-left: 2.5dvw;
  color: #9b6600;
  font-weight: bold;
}

.hero button {
  font-size: 18px;
  cursor: pointer;
  margin: 5px;
  font-weight: bold;
  margin-left: 2dvw;
}

.menu {
  text-align: center;
  padding: 20px;
}

.menu h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.pizza-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pizza-card {
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.pizza-card img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.pizza-card h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.pizza-card p {
  font-size: 16px;
  margin-bottom: 10px;
}

.pizza-card button {
  padding: 5px 10px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
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
