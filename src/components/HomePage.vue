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
            Vékony tésztás pizzák, vastag tésztás pizzák, egyedi <br>
            pizzák <span class="specialfont"> otthon(r)a </span>
          </p>
          <button @click="scrollToMenu" class="orderbtn">Rendelés most</button>
          <button class="menubtn">Irány az étlap</button>
        </div>
        <img src="../assets/image/pizzaimg.png" alt="Pizza Img" />
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

.specialfont{
  background: linear-gradient(to right,#5F8D37,#BB3E00);
  -webkit-text-fill-color: transparent; 
  -webkit-background-clip: text; 
}
.menubtn{
  background-color: rgba(247, 173, 69, 0.3);
  border: #F7AD45 solid 3px;
  border-radius: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.7dvw 3.3dvw;
  color: #F7AD45;
}
.orderbtn{
  background-color: #F7AD45;
  border: #F7AD45 solid 2px;
  border-radius: 40px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.7dvw 3.3dvw ;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}
img {
  border-radius: 30px;
}
.home {
  padding-bottom: 5dvw;
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
  color: #9B6600;
}

.hero p {
  font-size: 18px;
  margin-bottom: 2dvw;
  padding-left: 2.5dvw;
  color: #9B6600;
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