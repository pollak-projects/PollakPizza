<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { id } from "vuetify/locale";
import { useToast } from "vue-toastification";
import SlideInFromLeft from '@/components/SlideInFromLeft.vue';
import SlideInFromRight from '@/components/SlideInFromRight.vue';

const userData = ref({
  name: "",
  email: "",
  address: "",
  phonenumber: "",
});

const toast = useToast();

const getUserData = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get("http://localhost:3061/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      userData.value = response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  } else {
    console.log("No token found");
  }
};

export default {
  setup() {
    const pizzas = ref([]);
    const sizes = ref([]);
    const toppings = ref([]);
    const selectedToppings = ref([]);
    const selectedSize = ref("noSizeSelected");
    const amount = ref(0);
    let orderedPizzas = ref([]);
    const orderFullPrice = 0;
    const costumePizzaPrice = 0;
    const activePayment = ref("default");
    const activeSection = ref("pizzaink");
    const isModalOpen = ref(false);
    const activeModalSection = ref('choose');
    // Alapértéknek adjuk a "Kiszállítás"-t
    const selectedOption = ref("Kiszállítás"); // Alapérték

    // Dinamikusan kikapcsoljuk amikor az "Átvétel az étteremben" van kiválasztva.
    const isDisabled = computed(
      () => selectedOption.value === "Átvétel az étteremben"
    );

    const fetchToppings = async () => {
      try {
        const response = await axios.get("http://localhost:3061/alltoppings");
        toppings.value = response.data;
      } catch (err) {
        console.error("Error while loading pizzas or sizes:", err);
      }
    };

    const fetchPizzasAndSizes = async () => {
      try {
        const [pizzaResponse, sizeResponse] = await Promise.all([
          axios.get("http://localhost:3061/allpizzas"),
          axios.get("http://localhost:3061/allsizes"),
        ]);

        pizzas.value = pizzaResponse.data; // Feltöltjük a "pizzas"-t
        sizes.value = sizeResponse.data; // Feltöltjük a "sizes"-t

        setDefaultPrices(); // Futtatjuk miután mindkettő betöltött.
      } catch (error) {
        console.error("Error while loading pizzas or sizes:", error);
      }
    };

    const setDefaultPrices = () => {
      pizzas.value.forEach((pizza) => {
        pizza.selectedSize = sizes.value[0].id; // Default to the first size's ID
        const defaultMultiplier = sizes.value[0].multiPrice; // Get the multiplier for the first size
        pizza.calculatedPrice = pizza.price * defaultMultiplier; // Calculate price
      });
    };

    const setActiveSection = (section) => {
      activeSection.value = section;
      selectedToppings.value.length = 0
      amount.value = 0
      selectedSize.value = "noSizeSelected"
      const menuSection = document.getElementById("title");
      menuSection.scrollIntoView({ behavior: "smooth" });
    };

    const setActivePayment = (payment) => {
      activePayment.value = payment
      const paymentMethodSelectDiv = document.getElementById('selectPaymentMethod')
      const backModal = document.getElementById('backModal')

      backModal.classList.remove('hidden')
      paymentMethodSelectDiv.classList.add('hidden')
    }

    const addPizza = async (pizzaName, pizzaPrice, toppingsName) => {
      try {
        const response = await axios.post(
          "http://localhost:3061/admin/addPizza",
          {
            name: pizzaName,
            price: pizzaPrice,
            image: null,
            toppings: toppingsName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Return the response data so it can be used by the caller
        return response.data;
      } catch (error) {
        console.error("Failed to add pizza:", error);
        throw error; // Re-throw the error to handle it in the calling code
      }
    };

    function openModal() {
      isModalOpen.value = true; // Use .value to update the ref
      activeModalSection.value = 'choose'; // Reset to the initial screen
    }

    function closeModal() {
      if (this.orderedPizzas.length < 1) {
         //Létrehozzuk a megjelenő szöveget
         const htmlElement = document.createElement("h4");
         const htmlElementText = document.createTextNode(
           "A rendelés megkezdéséhez adjon hozzá egy pizzát!"
         );
         htmlElement.appendChild(htmlElementText);
         htmlElement.setAttribute("id", "nincsRendelesSzoveg");
 
         //A diven belül megjelenítjük
         const nincsRendelesSzovegDiv = document.getElementById(
           "nincsRendelesSzovegDiv"
         );
         nincsRendelesSzovegDiv.appendChild(htmlElement);
         document.getElementById("fizetes").classList.remove("enabled");
         document.getElementById("fizetes").classList.add("disabled");
       }
      isModalOpen.value = false; // Use .value to update the ref
    }

    function selectOption(option) {
      activeModalSection.value = option; // Set the active section to the selected option
    }

    function goBackToChoose() {
      activeModalSection.value = 'choose'; // Go back to the "choose" screen
    }

    onMounted(() => {
      getUserData();
      fetchPizzasAndSizes();
      fetchToppings();
    });

    return {
      pizzas,
      fetchPizzasAndSizes,
      orderedPizzas,
      orderFullPrice,
      sizes,
      setActiveSection,
      activeSection,
      selectedOption,
      isDisabled,
      fetchToppings,
      toppings,
      selectedToppings,
      costumePizzaPrice,
      isModalOpen,
      addPizza,
      selectedSize,
      amount,
      activePayment,
      setActivePayment,
      activeModalSection,
      openModal,
      closeModal,
      selectOption,
      goBackToChoose,
    };
  },
  computed: {
    filteredPizzas() {
      return this.pizzas.filter((pizza) => !pizza.name.includes("pizzája"));
    },
    costumePizzaPrice() {
      if (!this.pizzas.length) {
        this.costumePizzaPrice = 0;
        return;
      }
    
      const basePrice = this.pizzas[0]?.price || 0;
      const sizePrice = Number(this.sizes.find(size => size.id === this.selectedSize)?.multiPrice || 0);
      const toppingsPrice = this.selectedToppings.reduce((total, topping) => total + (topping.price || 0), 0);

      return ((basePrice * sizePrice) + toppingsPrice) * this.amount;
    },
  },
  watch: {
    selectedSize(newValue) {
      const toppingsDropdown = document.getElementById('costumeSelectedToppings');
      const ures = document.getElementById('ures')
      if (newValue) {
        toppingsDropdown?.classList.remove('disabled');
        ures?.classList.remove('disabled')
      } else {
        toppingsDropdown?.classList.add('disabled');
        ures?.classList.add('disabled')
      }
    },

    selectedToppings: {
      handler(newValue) {
        const amountInput = document.getElementById('costumeSelectedAmount');
        if (newValue.length > 0) {
          amountInput?.classList.remove('disabled');
          this.amount = 1
        } else {
          amountInput?.classList.add('disabled');
          this.amount = 0
        }
      },
      deep: true
    },

    amount(newValue) {
      const orderButton = document.getElementById('addPizza')
      if (newValue >= 1) {
        orderButton?.classList.remove('disabled');
      } else {
        orderButton?.classList.add('disabled');
      }
    },
  },
  methods: {
    updatePrice(pizza) {
      const selectedSize = this.sizes.find(
        (size) => size.id === pizza.selectedSize
      );
      if (selectedSize) {
        pizza.calculatedPrice = pizza.price * selectedSize.multiPrice;
      }
    },

    addTopping() {
      const selectedTop = document.getElementById(
        "costumeSelectedToppings"
      ).value;
      if (selectedTop == "noToppingSelected") {
        toast.error("Kérlek válassz rátétet.");
        return;
      }

      const topping = this.toppings.find((p) => p.id === Number(selectedTop));
      if (!topping) {
        toast.error("Hiba történt a rátét árának megtalálása során.");
        return;
      }

      const alreadySelected = this.selectedToppings.some(
        (p) => p.id === selectedTop
      );
      if (alreadySelected) {
        toast.error("Ez a rátét már hozzá lett adva!");
        return;
      }

      this.selectedToppings.push({
        id: selectedTop,
        name: topping.name,
        price: Number(topping.bonusPrice),
      });
    },

    removeTopping(index) {
      this.selectedToppings.splice(index, 1);
    },

    orderPizza(pizza) {
      //SIMA PIZZA RENDELÉS
      if (this.activeSection == "pizzaink") {
        /*CODE */
        const pizzaSize = document.getElementById(pizza.name);

        if (!pizzaSize || !pizzaSize.value) {
          toast.error("Válassz rátétet.");
          return;
        }
        /*TEXT CHANGE*/
        if (this.orderedPizzas.length <= 0) {
          document.getElementById("nincsRendelesSzoveg").remove();
        }

        /*CODE*/
        const pizzaSizeValue = pizzaSize.value;
        const pizzasSize = this.sizes.find((s) => s.id == pizzaSizeValue);
        const pizzaSizePrice = pizzasSize.multiPrice;

        const pizzaSizeText = pizzaSize.options[pizzaSize.selectedIndex].text;
        const pizzIndex = this.orderedPizzas.findIndex(
          (p) => p.name === pizza.name && p.size === pizzaSizeValue
        );

        if (pizzIndex !== -1) {
          this.orderedPizzas[pizzIndex].count += 1;
          this.orderFullPrice += Number(pizza.price) * Number(pizzaSizePrice);
        } else {
          this.orderedPizzas.push({
            id: pizza.id,
            count: 1,
            name: pizza.name,
            price: pizza.price * pizzaSizePrice,
            size: pizzaSizeValue,
            sizeText: pizzaSizeText,
            sizePrice: pizzaSizePrice,
          });
          this.orderFullPrice += Number(pizza.price) * Number(pizzaSizePrice);
          document.getElementById("fizetes").classList.remove("disabled");
          document.getElementById("fizetes").classList.add("enabled");
        }
      }

      //EGYEDI PIZZA RENDELÉS
      if (this.activeSection == "egyedi") {
        const size = document.getElementById("costumeSelectedSize").value;
        const amount = document.getElementById("costumeSelectedAmount").value;

        if (size == "noSizeSelected") {
          toast.error("Válassz a pizzádnak méretet!");
          return;
        }

        if (this.selectedToppings.length == 0) {
          toast.error("Válassz ki rátéteket!");
          return;
        }

        if (!amount) {
          toast.error("Válassz mennyiséget!");
          return;
        }
        /*TEXT CHANGE*/
        if (this.orderedPizzas.length <= 0) {
          document.getElementById("nincsRendelesSzoveg").remove();
        }

        let toppingsPrice = 0;
        this.selectedToppings.forEach((topping) => {
          toppingsPrice += Number(topping.price);
        });

        const pizzasSize = this.sizes.find((s) => s.id == size);
        const pizzaSizePrice = pizzasSize.multiPrice;
        const costumePizzaPrice = Number(1000 * pizzaSizePrice + toppingsPrice) * amount;
        const costumePizzaName = "Egyedi pizza";

        //Toppingsok megnézése
        let toppingsArrays = this.selectedToppings.map(
          (topping) => topping.name
        );

        // Megnézzük, hogy létezik-e már olyan pizza aminek a mérete és a rátéte ugyanaz
        const existingPizzaInDatabase = this.pizzas.find(
          (pizza) =>
            JSON.stringify(pizza.toppings) === JSON.stringify(toppingsArrays) &&
            pizza.size === size // Összehasonlítjuk a méretet és rátétet
        );

        if (existingPizzaInDatabase) {
          // Logoljuk és kihagyjuk
          console.log("Pizza already exists in the database with ID: 1");
        } else {
          // Létrehozzuk a pizzát, hiszen nem létezik
          const pizzaId = 1; // Alapértelmezett pizzaId

          // Megnézzük, hogy létezik-e már olyan megrendelt pizza aminek a mérete és a rátéte ugyanaz
          const existingPizzaInOrder = this.orderedPizzas.find(
            (pizza) =>
              JSON.stringify(pizza.toppings) ===
                JSON.stringify(toppingsArrays) && pizza.size === size // Összehasonlítjuk a méretet és rátétet
          );

          if (existingPizzaInOrder) {
            // Frissitjük az árakat
            existingPizzaInOrder.count += Number(amount);
            this.orderFullPrice += costumePizzaPrice; // Hozzáadjuk az árat
          } else {
            this.orderedPizzas.push({
              id: pizzaId,
              count: Number(amount),
              name: costumePizzaName,
              price: costumePizzaPrice / amount,
              size: size,
              sizeText: pizzasSize.size + " cm",
              sizePrice: pizzaSizePrice,
              toppings: toppingsArrays, // Elmentjuk, hogy tudjunk összehasonlítani
            });

            this.orderFullPrice += costumePizzaPrice; // Hozzáadjuk a pizza árát
          }
        }

        //TEXT TÖRLÉSE
        document.getElementById("fizetes").classList.remove("disabled");
        document.getElementById("fizetes").classList.add("enabled");
      }
    },

    pizzaCountAdd(pizza) {
      const pizz = this.orderedPizzas.find(
        (p) => p.name === pizza.name && p.sizeText === pizza.sizeText
      );

      pizz.count += 1;
      this.orderFullPrice += Number(pizza.price);
    },

    pizzaCountRemove(pizza) {
      /*CODE*/
      const pizzIndex = this.orderedPizzas.findIndex(
        (p) => p.name === pizza.name && p.sizeText === pizza.sizeText
      );

      if (pizzIndex !== -1) {
        const pizz = this.orderedPizzas[pizzIndex];
        pizz.count -= 1;
        this.orderFullPrice -= Number(pizza.price);
        if (pizz.count === 0) {
          this.orderedPizzas.splice(pizzIndex, 1);
        }
      }

      if (this.orderedPizzas.length == 0) {
        document.getElementById("fizetes").classList.add("disabled");
        document.getElementById("fizetes").classList.remove("enabled");
      }

      /*TEXT CHANGE*/
      if (this.orderedPizzas.length < 1) {
        //Létrehozzuk a megjelenő szöveget
        const htmlElement = document.createElement("h4");
        const htmlElementText = document.createTextNode(
          "A rendelés megkezdéséhez adjon hozzá egy pizzát!"
        );
        htmlElement.appendChild(htmlElementText);
        htmlElement.setAttribute("id", "nincsRendelesSzoveg");

        //A diven belül megjelenítjük
        const nincsRendelesSzovegDiv = document.getElementById(
          "nincsRendelesSzovegDiv"
        );
        nincsRendelesSzovegDiv.appendChild(htmlElement);
      }
    },

    submitOrder() {
      if (this.orderedPizzas.length <= 0) {
        toast.error("Adj valamit a kosárba!");
        return;
      }

      let address = "legszuperebb étterem helye"; // étterem címe
      const addressEmpty = document.getElementById("address");

      if (addressEmpty && addressEmpty.value.trim() !== "") {
        address = addressEmpty.value;
      }

      // Itt lehetne API hívást tenni rendelés küldéséhez
      this.orderedPizzas.forEach((pizza) => {
        let costumePizzaPrice = 0;
        let regularPizzaPrice = 0;
        if (pizza.name == "Egyedi pizza") {
          costumePizzaPrice += pizza.price
          try {
            axios.post(
              "http://localhost:3061/orders/addCostume",
              {
                userId: userData.value.id,
                pizzaId: 0,
                pizzaNum: pizza.count,
                sizeId: pizza.size,
                address: address,
                userPhone: userData.value.phonenumber,
                finalPrice: costumePizzaPrice,
                toppings: pizza.toppings,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          } catch (err) {
            console.error("Error adding order:", err);
          }
        } else {
          regularPizzaPrice += pizza.price
          try {
            axios.post(
              "http://localhost:3061/orders/add",
              {
                userId: userData.value.id,
                pizzaId: pizza.id,
                pizzaNum: pizza.count,
                sizeId: pizza.size,
                address: address,
                userPhone: userData.value.phonenumber,
                finalPrice: regularPizzaPrice,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          } catch (err) {
            console.error("Error adding order:", err);
          }
        }
      });
      toast.success("Köszönjük a rendelésed!");
      this.orderedPizzas = [];
      this.orderFullPrice = 0;
      this.selectedOption = "Kiszállítás"
      document.getElementById('address').value = ""
      this.closeModal();
    },
  },
};
</script>

<template>
  <div class="app">
    <div class="title" id="title">
      <h1>Rendelés</h1>
    </div>

    <div class="menu">
      <ul class="menubar">
        <li
          :class="{ active: activeSection === 'pizzaink' }"
          @click="setActiveSection('pizzaink')"
        >
          Pizzáink
        </li>
        <li
          :class="{ active: activeSection === 'egyedi' }"
          @click="setActiveSection('egyedi')"
        >
          Egyedi pizzák
        </li>
      </ul>
    </div>

    <div class="container">
      <!-- Bal oldal -->
      <div class="leftSide">
        <!-- Egyedi rendelés-->
        <div v-if="activeSection === 'egyedi'" class="row">
          <SlideInFromLeft class="costume">
            <div>
              <h3>Méret</h3>
              <select id="costumeSelectedSize" v-model="selectedSize">
                <option value="noSizeSelected" selected disabled>
                  Válassz méretet!
                </option>
                <option v-for="size in sizes" :value="size.id">
                  {{ size.size }} cm
                </option>
              </select>
            </div>

            <div>
              <h3>Feltétek</h3>
              <select id="costumeSelectedToppings" class="disabled">
                <option value="noToppingSelected" selected disabled>
                  Válassz feltétet!
                </option>
                <option v-for="top in toppings" :value="top.id">
                  {{ top.name }}
                </option>
              </select>
              <div class="kivalasztottSor">
                <p
                  v-for="(top, index) in selectedToppings"
                  :key="top.id"
                  @click="removeTopping(index)"
                >
                  {{ top.name }}
                </p>
                <p id="ures" class="ures disabled" @click="addTopping()">+</p>
              </div>
            </div>

            <div>
              <h3>Mennyiség</h3>
              <input
                class="disabled"
                id="costumeSelectedAmount"
                type="number"
                min="1"
                max="8"
                placeholder="1"
                value="1"
                v-model="amount"
              />
            </div>
            <!-- fixed -->
            <h1>{{ costumePizzaPrice }} Ft</h1>
            <div class="center">
              <button id="addPizza" @click="orderPizza()" class="disabled">Hozzáadás</button>
            </div>
          </SlideInFromLeft>
        </div>

        <!-- Pizzáink -->
        <div v-if="activeSection === 'pizzaink'" id="menu" class="menuList row">
          <SlideInFromLeft :delay="`${0.1 * filteredPizzas.indexOf(pizza)}s`" v-for="pizza in filteredPizzas" :key="pizza.id" class="item">
            <img class="previewpizza" :src="pizza.image" alt="Pizza" />
            <h4>{{ pizza.name }}</h4>
            <p class="ratet">{{ pizza.toppings }}</p>
            <select
              name="size"
              :id="pizza.name"
              v-model="pizza.selectedSize"
              @change="updatePrice(pizza)"
            >
              <option v-for="size in sizes" :value="size.id">
                {{ size.size }} cm
              </option>
            </select>
            <p class="ar">{{ pizza.calculatedPrice }} Ft</p>
            <button @click="orderPizza(pizza)" id="pizzaHozzad">
              Hozzáadás
            </button>
          </SlideInFromLeft>
        </div>
      </div>

      <!-- Jobb oldal -->
      <div class="rightSide">
        <SlideInFromRight class="delivery">
          <select
            name="atvetel"
            id="atvetel"
            class="iconCar"
            v-model="selectedOption"
          >
            <option value="Kiszállítás">Kiszállítás</option>
            <option value="Átvétel az étteremben">Átvétel az étteremben</option>
          </select>

          <input
            placeholder="Adja meg a kiszállítási címet"
            class="iconWaypoint"
            id="address"
            :class="{ disabled: isDisabled }"
          />
        </SlideInFromRight>

        <SlideInFromRight delay="0.1s" class="checkout">
          <div class="orderDetails">
            <h3>Rendelésed</h3>
            <hr />

            <div class="orders row" id="orders">
              <div class="nincsRendelesSzoveg" id="nincsRendelesSzovegDiv">
                <h4 id="nincsRendelesSzoveg">
                  A rendelés megkezdéséhez adjon hozzá egy pizzát!
                </h4>
              </div>

              <div
                class="rendelesRow"
                v-for="pizza in orderedPizzas"
                :key="pizza.id"
              >
                <div class="targy half">
                  <h4>
                    <span id="darab">{{ pizza.count }}</span
                    >x {{ pizza.name }}
                  </h4>
                  <h6>{{ pizza.sizeText }}</h6>
                </div>
                <div class="szamol half">
                  <h4>{{ pizza.price }} Ft</h4>
                  <div class="szamolGombok">
                    <button id="hozzaadas" @click="pizzaCountAdd(pizza)">
                      +
                    </button>
                    <button id="kivonas" @click="pizzaCountRemove(pizza)">
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
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
              <a
                class="fizetesGomb disabled"
                id="fizetes"
                @click="openModal()"
                >Fizetés</a
              >
            </div>
          </div>
        </SlideInFromRight>
        <!-- MODAL -->
        <div v-if="isModalOpen" id="Fizetes" :class="['modal-window', { 'is-visible': isModalOpen }]">
          <div class="modal-content">
            <!-- Option Selection Screen -->
            <div v-if="activeModalSection === 'choose'">
              <h2>Válassz fizetési lehetőséget</h2>
              <div class="modal-buttons">
                <button @click="selectOption('option1')">Bankkártya</button>
                <button @click="selectOption('option2')">Készpénz</button>
              </div>
            </div>
          
            <!-- Option 1 Content -->
            <div v-if="activeModalSection === 'option1'" class="payment-form">
              <h2>Bankkártyás fizetés</h2>
              <div class="form-group">
              <label for="cardNumber">Kártyaszám</label>
              <input id="cardNumber" type="text" placeholder="Kártyaszám" />
              </div>
              <div class="form-group">
              <label for="expiryDate">Lejárati dátum</label>
              <div class="form-group-row">
                <input id="expiryYear" type="text" placeholder="Év" />
                <input id="expiryMonth" type="text" placeholder="Hónap" />
              </div>
              </div>
              <div class="form-group">
              <label for="securityCode">Biztonsági kód</label>
              <input id="securityCode" type="text" placeholder="Biztonsági kód" />
              </div>
              <div class="form-group">
              <label for="cardName">Név a kártyán</label>
              <input id="cardName" type="text" placeholder="Név a kártyán" />
              </div>
              <div class="form-actions">
              <button @click="submitOrder()" class="modal-finish">Fizetés</button>
              <button @click="goBackToChoose" class="modal-back">Vissza</button>
              </div>
            </div>
          
            <!-- Option 2 Content -->
            <div v-if="activeModalSection === 'option2'" class="cash-payment">
              <h2>Készpénzes fizetés</h2>
              <div class="cash-payment-details">
                <p v-if="selectedOption === 'Kiszállítás'">
                  Köszönjük rendelését! A futár hamarosan útnak indul.<br />
                  <strong>Fizetés:</strong> készpénzben a futárnál.<br />
                  Kérjük, készítse elő a fizetendő összeget!
                </p>
                <p v-else-if="selectedOption === 'Átvétel az étteremben'">
                  Köszönjük rendelését! Az ételt az étteremben veheti át.<br />
                  <strong>Fizetés:</strong> készpénzben az átvételkor.<br />
                  Várjuk Önt szeretettel!
                </p>
              </div>
              <div class="form-actions">
                <button class="modal-finish" @click="submitOrder()">Rendelés leadása</button>
                <button class="modal-back" @click="goBackToChoose">Vissza</button>
              </div>
            </div>
          
            <!-- Close Button -->
            <button class="modal-close" @click="closeModal">Bezárás</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/order.css"></style>
