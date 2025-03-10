<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const pizzas = ref([]);
    const orderedPizzas = ref([]);
    const orderFullPrice = 0;
    
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

    return { pizzas, fetchPizzas, orderedPizzas, orderFullPrice };
  },
  
  methods:{
    scrollToMenu() {
      const menuSection = document.getElementById("menu");
      menuSection.scrollIntoView({ behavior: "smooth" });
    },

    orderPizza(pizza) {
      /*TEXT CHANGE*/
      if (this.orderedPizzas.length <= 0) {
        document.getElementById('nincsRendelesSzoveg').remove()
      }

      /*CODE*/
      const pizzIndex = this.orderedPizzas.findIndex(p => p.name === pizza.name);

      if (pizzIndex !== -1) {
        this.orderedPizzas[pizzIndex].count += 1;
        this.orderFullPrice += pizza.price
      } else {
        this.orderedPizzas.push({ count: 1, name: pizza.name, price: pizza.price });
        this.orderFullPrice += pizza.price
      }
    },

    pizzaCountAdd(pizza) {
      const pizz = this.orderedPizzas.find(p => p.name === pizza.name)
      pizz.count += 1
      this.orderFullPrice += pizza.price
    },

    pizzaCountRemove(pizza) {
      /*CODE*/
      const pizzIndex = this.orderedPizzas.findIndex(p => p.name === pizza.name);

      if (pizzIndex !== -1) {
        const pizz = this.orderedPizzas[pizzIndex];
        pizz.count -= 1;
        this.orderFullPrice -= pizza.price
        if (pizz.count === 0) {
          this.orderedPizzas.splice(pizzIndex, 1);
        }
      }

      /*TEXT CHANGE*/
      if (this.orderedPizzas.length < 1) {
        //Létrehozzuk a megjelenő szöveget
        const htmlElement = document.createElement('h4');
        const htmlElementText = document.createTextNode("A rendelés megkezdéséhez adjon hozzá egy pizzát!");
        htmlElement.appendChild(htmlElementText);
        htmlElement.setAttribute('id', "nincsRendelesSzoveg")

        //A diven belül megjelenítjük
        const nincsRendelesSzovegDiv = document.getElementById("nincsRendelesSzovegDiv");
        nincsRendelesSzovegDiv.appendChild(htmlElement);
      }
    },
    submitOrder() {
      alert(`Köszönjük a rendelésed!`);
      console.log("teszt");
      // Itt lehetne API hívást tenni rendelés küldéséhez
    },
  }
};

</script>

<template>
  <div class="app">
    <div class="title">
      <h1>Rendelés</h1>
    </div>

    <div class="menu">
      <ul class="menubar">
        <li class="active" @click="scrollToMenu">Pizzáink</li>
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
              <p class="ratet">{{ pizza.toppings }}</p>
              <p class="ar">{{ pizza.price }} Ft</p>
              <button @click="orderPizza(pizza)" id="pizzaHozzad">Hozzáadás</button>
            </div>
        </div>
      </div>
      
      <!-- Jobb oldal -->
      <div class="rightSide">
        <div class="delivery">

          <select name="atvetel" id="atvetel" class="iconCar" placeholder="Kiszállítás">
            <option value="Kiszállítás">Kiszállítás</option>
            <option value="Átvétel az étteremben">Átvétel az étteremben</option>
          </select>

          <input placeholder="Adja meg a kiszállítási címet" class="iconWaypoint">
        </div>

        <div class="checkout">
          <div class="orderDetails">
            <h3>Rendelésed</h3>
            <hr>

            <div class="orders row" id="orders">

              <div class="nincsRendelesSzoveg" id="nincsRendelesSzovegDiv">
                <h4 id="nincsRendelesSzoveg">A rendelés megkezdéséhez adjon hozzá egy pizzát!</h4>
              </div>

              <div class="rendelesRow" v-for="pizza in orderedPizzas" :key="pizza.id">
                <div class="targy half">
                  <h4><span id="darab">{{ pizza.count }}</span>x {{ pizza.name }}</h4>
                </div>
                <div class="szamol half">
                  <h4>{{pizza.price}} Ft</h4>
                  <div class="szamolGombok">
                    <button id="hozzaadas" @click="pizzaCountAdd(pizza)">+</button>
                    <button id="kivonas" @click="pizzaCountRemove(pizza)">-</button>
                  </div>
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

            <div>
              <div class="osszeg">
                <h3>ÖSSZESEN:</h3>
                <h3>{{ orderFullPrice }} Ft</h3>
              </div>
            </div>

            <div class="fizetes">
              <button @click="submitOrder()">Fizetés</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/order.css"></style>