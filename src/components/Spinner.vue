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

<style scoped src="../assets/css/spinner.css"></style>