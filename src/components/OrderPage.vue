<script>
import { ref, onMounted } from "vue";
import axios from "axios";

const userData = ref({
  name: '',
  email: '',
  address: '',
  phonenumber: ''
});

/*IZE KIKAPCSOLADA */


const getUserData = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios.get('http://localhost:3061/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      userData.value = response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }
    }
  } else {
    console.log('No token found');
  }
};

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
      getUserData();
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
        this.orderedPizzas.push({ id: pizza.id, count: 1, name: pizza.name, price: pizza.price });
        this.orderFullPrice += pizza.price
        document.getElementById('fizetes').classList.remove('disabled')
        document.getElementById('fizetes').classList.add('enabled')
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

      if (this.orderedPizzas.length == 0) {
        document.getElementById('fizetes').classList.add('disabled')
        document.getElementById('fizetes').classList.remove('enabled')
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
      if (this.orderedPizzas.length <= 0) {
        alert("adj vmit a kosarba")
        return
      }

      const userID = userData.value.id
      const sizeID = 1 //alapértelmezett méret
      const address = userData.value.address //alapértelmezett cím
      const userPhone = userData.value.phonenumber
      
      // Itt lehetne API hívást tenni rendelés küldéséhez
      // Minden pizzánál meghívjuk a küldést
      this.orderedPizzas.forEach(pizza => {
      for (let i = 0; i < pizza.count; i++) {
        (async () => {
          try {
            await axios.post('http://localhost:3061/orders/add', {
              userId: userID, 
              pizzaId: pizza.id, 
              sizeId: sizeID, 
              address: address, 
              userPhone: userPhone, 
              finalPrice: pizza.price
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            alert('Köszönjük a rendelésed!');
          } catch (err) {
            console.error('Error adding order:', err);
            message.value = 'Error adding order';
          }
        })(); // <-- Immediately invoke the async function
      
        console.log("userid:" + userID);
        console.log("pizzaid:" + pizza.id);
        console.log("sizeid:" + sizeID);
        console.log("address:" + address);
        console.log("userphone:" + userPhone);
        console.log("finalprice:" + pizza.price);
        console.log("-------------------------");
      }
    });
    },
    openModal() {
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      document.body.style.overflow = 'auto'
    }
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

          <select name="atvetel" id="atvetel" class="iconCar">
            <option value="Kiszállítás">Kiszállítás</option>
            <option value="Átvétel az étteremben">Átvétel az étteremben</option>
          </select>

          <input placeholder="Adja meg a kiszállítási címet" class="iconWaypoint" id="address">
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
              <a class="fizetesGomb disabled" id="fizetes" href="#openModal" @click="openModal()">Fizetés</a>
            </div>

            <!-- MODAL -->
            <div id="openModal" class="modal-window">
              <div class="rendeles">
                <h1>Rendelésed</h1>
                <hr>
                <div class="orders row" id="orders">
                  <div class="rendelesRow" v-for="pizza in orderedPizzas" :key="pizza.id">
                    <div class="targy half">
                      <h4><span id="darab">{{ pizza.count }}</span>x {{ pizza.name }}</h4>
                    </div>
                    <div class="szamol half">
                      <h4>{{pizza.price}} Ft</h4>
                    </div>
                  </div>
                </div>
                <hr>
                <div>
                  <div class="osszeg">
                    <h3>ÖSSZESEN:</h3>
                    <h3>{{ orderFullPrice }} Ft</h3>
                  </div>
                </div>
              </div>
              <div>
                <a href="#" title="Close" class="modal-close" @click="closeModal()">Bezárás</a>

                <h1>
                  Fizetés
                </h1>

                <p>NE ADD MEG A KÁRTYA ADATAID</p>

                <div class="cardDeatils">
                  <label>Kártyaszám</label>
                  <br>
                  <input type="text" placeholder="0123 4567 8910" maxlength="14">
                  <br>
                  <label >Kártyahordozó</label>
                  <br>
                  <input type="text" placeholder="Michael Jackson">
                  <br>
                  <label>Lejárati év</label>
                  <br>
                  <select name="lejaratHonap" id="">
                    <option value="1">1</option>
                  </select>
                  <select name="lejaratEv" id="">
                    <option value="2016">2016</option>
                  </select>
                  <br>
                  <label>CVC</label>
                  <br>
                  <input type="text" placeholder="696" maxlength="3">
                </div>
                <div class="fizetes">
                  <button class="fizetesGomb" @click="submitOrder()">Fizetés</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/order.css"></style>