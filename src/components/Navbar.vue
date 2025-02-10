<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Router
const router = useRouter();
const route = useRoute();

// State for managing login status and dropdown visibility
const isLoggedIn = ref(false);
const isDropdownVisible = ref(false);  // Dropdown visibility state

// Check if there is a token in localStorage
onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
  }
});

// Login logic
const handleLogin = () => {
  router.push("/login");
};

// Navigate to profile page
const goToProfile = () => {
  router.push("/profile");
};

// Navigate to cart page
const goToCart = () => {
  router.push("/cart");
};

// Logout logic
const handleLogout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  router.push("/login");
};

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <div class="flex">
        <p class="pl">POLLAK</p>
        <p>PIZZA</p>
      </div>
    </div>
    <div class="nav-links">
      <!-- Use <router-link> for navigation and active class binding -->
      <router-link to="/" :class="{ active: route.path === '/' }">Kezdőlap</router-link>
      <router-link to="/Menu" :class="{ active: route.path === '/Menu' }">Pizzák</router-link>
      <router-link to="/Order" :class="{ active: route.path === '/Order' }" class="right">Rendelés</router-link>
    </div>
    <!-- Profile image with dropdown toggle -->
    <div class="profile-container" @click="toggleDropdown">
      <img src="../assets/image/usericon.png" alt="user img" class="profileimg" />
      <div v-if="isDropdownVisible" class="dropdown-menu">
        <p @click="goToProfile">Profil</p>
        <p @click="goToCart">Kosár</p>
        <p @click="handleLogout">Kijelentkezés</p>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.profileimg {
  width: 2vw;
  height: 2vw;
  cursor: pointer;
  border-radius: 50%;
}

.pl {
  padding-left: 2dvw;
  font-weight: bold;
  padding-right: 3dvw;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex p {
  font-size: 30px;
}

/* Navbar styles */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #dba14a;
  color: white;
}

.nav-links {
  display: flex;
  gap: 15px;
  padding-left: 38%;
  padding-right: 2%;
}

button {
  background-color: transparent;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  color: #f1f1f1;
}

.nav-links a,
.nav-links .router-link-active {
  color: white;
  text-decoration: none;
}

.nav-links .active {
  font-weight: bold;
  color: #f1f1f1;
  border-bottom: 2px solid #f1f1f1; /* Example active link styling */
}

/* Profile dropdown styles */
.profile-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #f4a83d;
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 120px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dropdown-menu p {
  margin: 10px 0;
  cursor: pointer;
}

.dropdown-menu p:hover {
  background-color: #dba14a;
  border-radius: 5px;
}
</style>
