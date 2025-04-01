<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Router
const router = useRouter();
const route = useRoute();

// State for managing login status and dropdown visibility
const isLoggedIn = ref(false);
const isAdmin = ref(false); // Admin jogosultság állapota
const isDropdownVisible = ref(false); // Dropdown visibility state
const isMobileMenuOpen = ref(false); // Mobile menu state

// Check if there is a token in localStorage
onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    isAdmin.value = decodedToken.admin === 1; // Admin jogosultság ellenőrzése
  }
});

// Navigate to profile page
const goToProfile = () => {
  router.push("/profile");
};

// Navigate to cart page
const goToHome = () => {
  router.push("/");
};

// Navigate to admin page
const goToAdmin = () => {
  router.push("/admin");
};

// Logout logic
const handleLogout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  isAdmin.value = false;
  router.push("/login");
};

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <div class="flex">
        <p class="pl" @click="goToHome()">POLLAK</p>
        <p @click="goToHome()">PIZZA</p>
      </div>
    </div>
    <div class="nav-links" :class="{ 'nav-active': isMobileMenuOpen }">
      <router-link to="/" :class="{ active: route.path === '/' }">Kezdőlap</router-link>
      <router-link to="/menu" :class="{ active: route.path === '/menu' }">Pizzák</router-link>
      <router-link to="/order" :class="{ active: route.path === '/order' }" class="right">Rendelés</router-link>
    </div>
    <div class="profile-container" @click="toggleDropdown">
      <img src="../assets/image/usericon.png" alt="user img" class="profileimg" />
      <div v-if="isDropdownVisible" class="dropdown-menu">
        <p @click="goToProfile">Profil</p>
        <p v-if="isAdmin" @click="goToAdmin">Admin</p> <!-- Admin link -->
        <p @click="handleLogout">Kijelentkezés</p>
      </div>
    </div>
    <div class="hamburger" @click="toggleMobileMenu">
      &#9776;
    </div>
  </nav>
</template>

<style scoped src="../assets/css/navbar.css"></style>