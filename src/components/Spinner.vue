<script>

export default {
  data() {
    return {
      activeLink: window.location.pathname, // Initializes the activeLink based on the current URL
      isLoggedIn: false, // Example login status, adjust based on your actual logic
      pizzas: [],
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
      <!-- Bal oldal -->
      <div class="items leftSide">
        <svg class="spinner" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
        </svg>
      </div>
</template>

<style scoped>
.items {
  height: 200px;
  width: 20px;
  background-color: rgba(0,0,0,0,0);
}

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

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  
  & .path {
    stroke: hsl(41, 100%, 50%);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>
