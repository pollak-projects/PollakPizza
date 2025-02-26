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
  };

</script>

<template>
  <div class="app">
    <div class="title">
      <h1>Rendelés</h1>
    </div>

    <div class="menu">
      <ul class="menubar">
        <li class="active" @click="scrollToMenu">Húsos pizzák</li>
        <li @click="scrollToMenu">Sajtos pizzák</li>
        <li @click="scrollToMenu">Egyedi pizzák</li>
      </ul>
    </div>

    <div class="container">
      <!-- Bal oldal -->
      <div class="leftSide">
          <div id="menu" class="menuList row">
            <div v-for="pizza in pizzas" :key="pizza.id" class="item">
              <img class="previewpizza" :src="pizza.image" alt="Pizza" />
              <h4>{{ pizza.name }}</h4>
              <p>{{ pizza.price }} Ft</p>
              <p>{{ pizza.toppings }}</p>
              <button @click="orderPizza(pizza)">Rendelés</button>
            </div>
        </div>
      </div>
      
      <!-- Jobb oldal -->
      <div class="rightSide">
        <div class="delivery">

          <select name="cars" id="cars" class="iconCar" placeholder="Kiszállítás">
            <option value="Kiszállítás">Kiszállítás</option>
            <option value="Átvétel az étteremben">Átvétel az étteremben</option>
          </select>

          <input placeholder="Adja meg a kiszállítási címet" class="iconWaypoint">
        </div>

        <div class="checkout">
          <div class="orderDetails">
            <h3>Rendelésed</h3>
            <hr>

            <div class="orders row">

              <div class="targy half">
                <h4><span id="darab">1</span>x Nápolyi pizza</h4>
              </div>
              <div class="szamol half">
                <h4>10 Ft</h4>
                <div class="szamolGombok">
                  <button id="hozzaadas">+</button>
                  <button id="kivonas">-</button>
                </div>
              </div>

              <div class="targy half">
                <h4><span id="darab">1</span>x Nápolyi pizza</h4>
              </div>
              <div class="szamol half">
                <h4>10 Ft</h4>
                <div class="szamolGombok">
                  <button id="hozzaadas">+</button>
                  <button id="kivonas">-</button>
                </div>
              </div>

              <div class="targy half">
                <h4><span id="darab">1</span>x Nápolyi pizza</h4>
              </div>
              <div class="szamol half">
                <h4>10 Ft</h4>
                <div class="szamolGombok">
                  <button id="hozzaadas">+</button>
                  <button id="kivonas">-</button>
                </div>
              </div>

            </div>
            <hr>
          </div>

          <div class="total">
            <div class="szallitas">
              <h3>Kiszállítás:</h3>
              <h3>INGYENES</h3>
            </div>

            <div class="osszeg">
              <h3>ÖSSZESEN:</h3>
              <h3>10 Ft</h3>
            </div>

            <div class="fizetes">
              <button>Fizetés</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
.hidden {
  opacity: 0;
}

.app {
  height: 1080px;
  width: 100%;
  font-family: 'Lato';
  background: rgb(255,241,216);
  background: radial-gradient(circle, rgba(255,241,216,1) 0%, rgba(255,225,168,1) 100%);
}

.loaded {
  opacity: 1;
}

.wrapper {
  margin: 0 auto;
  width: 960px;
}

.selected {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

.order {
  background-color: #FFF1D7;
  border-radius: 90px;
  color: #F7AD45;
}

.bold {
  font-weight: bold;
}

.bolder {
  font-weight: bolder;
}

.title h1 {
  color: #9B6600;
  font-size: 64px;
  text-align: center;
  font-weight: 800;
  margin: 10px;
}

.menu {
  background-color: #FCC77C;
  height: 67px;
  width: 685px;
  border-radius: 50px;
  margin: auto;
  align-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.menubar {
  list-style: none;
  display: inline-block;
  margin: 0;
  padding-inline-start: 0;
  text-align: center;
}

.menubar li {
  display: inline-block;
  padding: 0px 30px;
  line-height: 50px;
  width: 160px;
  margin: 0;
  cursor: pointer;
  transition: background-color 0.3s ease-out;
  background-color: rgba(247, 173, 69, 0.8);
  color: #9B6600;
  font-weight: bold;
  border-radius: 50px;
  margin: 0px 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menubar li:hover{
  background-color: #F7AD45;
  color: #FFF1D7;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menubar li.active{
  background-color: #F7AD45;
  color: #FFF1D7;
}

.items {
  height: 200px;
  width: 20px;
  background-color: rgba(0,0,0,0,0);
}

.item {
  width: 290px;
  height: 370px;
  background-color: rgba(247,173,69,0.4);
  border-radius: 50px;
  color: #9B6600;
  text-align: center;
  font-weight: bolder;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 10px 10px 10px 10px;
}

.item img {
  border-radius: 50px 50px 0px 0px;
  width: 290px;
  height: 178px;
}

.item button {
  border: 0;
  background-color: #F7AD45;
  width: 150px;
  height: 50px;
  border-radius: 75px;
  color: #FFF1D7;
  font-weight: bold;
  font-size: 18px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.item h4 {
  margin: 40px 0px 5px 0px;
}

.item button:hover {
  background-color: #E5A242;
  cursor: pointer;
}

.delivery {
  height: 205px;
  width: 300px;
  background-color: #FCC77C;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.delivery input {
  background-color: #F7AD45;
  border: 0;
  border-radius: 75px;
  height: 50px;
  width: 230px;
  margin: 10px 0px 10px 0px;
  color: #9B6600;
  text-overflow: ellipsis;
  font-weight: 700;
  cursor: pointer;
}

.delivery input:focus {
  border: #9B6600 solid 2px;
}

.delivery input:focus-visible {
  outline: none;
}

.delivery select {
  background-color: #F7AD45;
  border: 0;
  border-radius: 75px;
  height: 50px;
  width: 230px;
  margin: 10px 0px 10px 0px;
  color: #9B6600;
  font-weight: 700;
  cursor: pointer;
}

.delivery select:hover {
  border: #9B6600 solid 1px;
}

.delivery select:focus {
  border: #9B6600 solid 2px;
}

.delivery select:focus-visible {
  outline: none;
}

.iconCar {
  padding-left: 40px;
  background: url("https://cdn-icons-png.freepik.com/512/75/75689.png") no-repeat left;
  background-size: 20px;
  background-position-x: 10px;
}

.iconWaypoint {
  padding-left: 40px;
  background: url("https://icon-library.com/images/waypoint-icon/waypoint-icon-0.jpg") no-repeat left;
  background-size: 15px;
  background-position-x: 13px;
}

.checkout {
  height: 330px;
  width: 300px;
  background-color: #FCC77C;
  border-radius: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.checkout hr {
  background-color: #9B6600;
  height: 2px;
  border: 0;
  width: 85%;
}

.orderDetails h3 {
  margin: 20px 30px 10px 30px;
  align-self: flex-start;
  font-weight: 900;
}

.orderDetails {
  color: #9B6600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.orderDetails button {
  background-color: #FFF1D7;
  border: #9B6600 solid 2px;
  color: #9B6600;
  font-weight: 700;
  font-size: 15px;
  width: 23px;
  height: 15px;
  cursor: pointer;
}

.orders {
  display: flex;
  justify-content: space-around;
  margin: 0px 30px 0px 30px;
  height: 140px;
  overflow-x: auto;
}

.orders hr {
  margin: auto;
}

.orders button {
  padding: 0;
  line-height: 0.3;
}

.orders::-webkit-scrollbar {
    width: 12px;
    height: 85%;
}

.orders::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
}

.orders::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0,0,0,0.2); 
}

.orders::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 10px; 
}

.orders::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 10px;
}

.total {
  color: #684400;
  font-weight: bolder;
}

.total button {
  border: 0;
  background-color: #F7AD45;
  width: 250px;
  height: 50px;
  border-radius: 75px;
  color: #FFF1D7;
  font-weight: bold;
  font-size: 18px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  width: 976px;;
  display: flex;
  justify-content: center;
  margin: auto;
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.szallitas {
  display: flex;
  justify-content: space-between;
  margin: 0px 30px 0px 30px;
}

.osszeg {
  display: flex;
  justify-content: space-between;
  margin: 0px 30px 0px 30px;
}

.szamol {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
}

.szamol h4 {
  margin: 0px;
}

.targy {
  display: flex;
  justify-content: center;
}

.targy h4 {
  margin: 7px 0px 7px 0px;
}

.szamolGombok buttons{
   display: block; 
   margin: 5px 0;
}

.fizetes {
  display: flex;
  justify-content: center;
}

.fizetes button:hover {
  background-color: #E5A242;
  cursor: pointer;
}
/*Elhelyezkedés*/
.leftSide {
  display: flex;
  width: 66.6666%;
  padding: 30px 0px 0px 0px;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 810px;
  overflow-y: auto;
  overflow-x: hidden;
}

.leftSide::-webkit-scrollbar {
    width: 12px;
}

.leftSide::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
}

.leftSide::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0,0,0,0.2); 
}

.leftSide::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 40px; 
}

.leftSide::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 40px;
}

.rightSide {
  display: flex;
  width: 33.3333%;
  padding: 30px 0px 0px 0px;
  align-items: center;
  flex-direction: column;
}

.half {
  display: flex;
  width: 50%;
}
</style>
