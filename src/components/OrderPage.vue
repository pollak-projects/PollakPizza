<script>
import { ref } from "vue";
import margaretaImage from "@/assets/image/margareta.jpg";
import pepiImage from "@/assets/image/pepi.jpg";
import hawaiiImage from "@/assets/image/hawaii.jpg";
const isLoggedIn = ref(false);

export default {
  data() {
    return {
      activeLink: window.location.pathname, // Initializes the activeLink based on the current URL
      isLoggedIn: false, // Example login status, adjust based on your actual logic
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
<body>
  
  
    <div class="title">
      <h1>Rendelés</h1>
    </div>

    <div class="menu">
      <ul class="menubar">
        <li class="active">Húsos pizzák</li>
        <li>Sajtos pizzák</li>
        <li>Egyedi pizzák</li>
      </ul>
    </div>

    <div class="container row">

      <!-- Bal oldal -->
      <div class="items leftSide">

        <div class="row">
          <div class="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg" alt="PIZZAA">
            <h3>Nápolyi pizza</h3>
            <h4>10 Ft</h4>
            <button>Hozzáadás</button>
          </div>

          <div class="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg" alt="PIZZAA">
            <h3>Nápolyi pizza</h3>
            <h4>10 Ft</h4>
            <button>Hozzáadás</button>
          </div>

          <div class="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg" alt="PIZZAA">
            <h3>Nápolyi pizza</h3>
            <h4>10 Ft</h4>
            <button>Hozzáadás</button>
          </div>

          <div class="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg" alt="PIZZAA">
            <h3>Nápolyi pizza</h3>
            <h4>10 Ft</h4>
            <button>Hozzáadás</button>
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

</body>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');


body {
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

.title {
  color: #9B6600;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
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
}

.menubar li:hover{
  background-color: #F7AD45;
  color: #FFF1D7;
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
}

.delivery input {
  background-color: #F7AD45;
  border: 0;
  border-radius: 75px;
  height: 50px;
  width: 230px;
  margin: 10px 0px 10px 0px;
  color: #9B6600;
}

.delivery select {
  background-color: #F7AD45;
  border: 0;
  border-radius: 75px;
  height: 50px;
  width: 230px;
  margin: 10px 0px 10px 0px;
  color: #9B6600;
}

.iconCar {
  padding-left: 30px;
  background: url("https://cdn-icons-png.freepik.com/512/75/75689.png") no-repeat left;
  background-size: 20px;
  background-position-x: 7px;
}

.iconWaypoint {
  padding-left: 30px;
  background: url("https://icon-library.com/images/waypoint-icon/waypoint-icon-0.jpg") no-repeat left;
  background-size: 15px;
  background-position-x: 7px;
}

.checkout {
  height: 330px;
  width: 300px;
  background-color: #FCC77C;
  border-radius: 50px;
}

.checkout hr {
  background-color: #9B6600;
  height: 2px;
  border: 0;
  width: 85%;
}

.orderDetails h3 {
  margin: 20px 30px 10px 30px;
}

.orderDetails {
  color: #9B6600;
}

.orderDetails button {
  background-color: #FFF1D7;
  border: #9B6600 solid 2px;
  color: #9B6600;
  font-weight: bold;
  width: 23px;
  height: 15px;
  cursor: pointer;
}

.orders {
  display: flex;
  justify-content: space-around;
  margin: 0px 30px 0px 30px;
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
}

.container {
  width: 976px;;
  display: flex;
  justify-content: center;
}

.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: calc(-1* var(--bs-gutter-y));
  margin-right: calc(-.5* var(--bs-gutter-x));
  margin-left: calc(-.5* var(--bs-gutter-x));
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
  align-items: center;
}

.szamol h4 {
  margin: 0px;
}

.targy {
  display: flex;
  justify-content: center;
}

.targy h4 {
  margin: 7px 0px 0px 40px;
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
