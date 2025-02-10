<script>
import margaretaImage from "@/assets/image/margareta.jpg";
import pepiImage from "@/assets/image/pepi.jpg";
import hawaiiImage from "@/assets/image/hawaii.jpg";

export default {
  data() {
    return {
      pizzas: [
        {
          id: 1,
          name: "Margherita",
          description: "Alap paradicsomszósz, mozzarella, bazsalikom",
          price: 1500,
          image: margaretaImage,
        },
        {
          id: 2,
          name: "Pepperoni",
          description: "Szalámi, mozzarella, paradicsomszósz",
          price: 1800,
          image: pepiImage,
        },
        {
          id: 3,
          name: "Hawaii",
          description: "Sonka, ananász, mozzarella, paradicsomszósz",
          price: 1200,
          image: hawaiiImage,
        },
      ],
      order: {
        name: "",
        pizza: "",
        address: "",
      },
    };
  },
  methods: {
    scrollToMenu() {
      const menuSection = document.getElementById("menu");
      menuSection.scrollIntoView({ behavior: "smooth" });
    },
    orderPizza(pizza) {
      this.order.pizza = pizza.name;
      alert(`A ${pizza.name} pizzát adtad hozzá a rendeléshez!`);
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
            pizzák otthonra
          </p>
          <button @click="scrollToMenu">Rendelj most</button>
          <button>Irány az étlap</button>
        </div>
        <img src="../assets/image/pizzaimg.png" alt="" />
      </div>
    </section>

    <section id="menu" class="menu">
      <h2>Menü</h2>
      <div class="pizza-list">
        <div v-for="pizza in pizzas" :key="pizza.id" class="pizza-card">
          <img :src="pizza.image" alt="Pizza" />
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
      <form @submit.prevent="submitOrder">
        <div>
          <label for="name">Név:</label>
          <input type="text" id="name" v-model="order.name" required />
        </div>
        <div>
          <label for="pizza">Válaszd ki a pizzát:</label>
          <select v-model="order.pizza" required>
            <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.name">
              {{ pizza.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="address">Szállítási cím:</label>
          <input type="text" id="address" v-model="order.address" required />
        </div>
        <button type="submit">Rendelés leadása</button>
      </form>
    </section>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
img {
  max-height: 185px;
  border-radius: 30px;
}
.home {
  padding-bottom: 5dvw;
  background-color: rgb(240, 160, 55);
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
  padding-left: 30%;
  display: flex;
  align-items: center;
  text-align: left;
  color: #fff;
}
.hero-content img {
  flex: 0 0 auto;
  margin-left: 20px;
  width: 40%;
  height: 40%;
}
.text-content {
  flex: 1;
}
.hero-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.hero h2 {
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
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

.order form button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.order form button:disabled:hover {
  background-color: #999;
}

.order form button:disabled:active {
  background-color: #999;
}

.order form button:disabled:focus {
  background-color: #999;
}

.order form button:disabled:active {
  background-color: #999;
}

.order form button:disabled:focus {
  background-color: #999;
}

.order form button:disabled:active {
  background-color: #999;
}

.order form button:disabled:focus {
  background-color: #999;
}

.order form button:disabled:active {
  background-color: #999;
}
</style>
