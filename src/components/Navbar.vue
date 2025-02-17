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
const goToCart = () => {
  router.push("/cart");
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
        <p class="pl">POLLAK</p>
        <p>PIZZA</p>
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
        <p @click="goToCart">Kosár</p>
        <p v-if="isAdmin" @click="goToAdmin">Admin</p> <!-- Admin link -->
        <p @click="handleLogout">Kijelentkezés</p>
      </div>
    </div>
    <div class="hamburger" @click="toggleMobileMenu">
      &#9776;
    </div>
  </nav>
</template>

<style scoped>
.profileimg {
  width: 3dvw;
  height: 3dvw;
  cursor: pointer;
  float: right;
  border-radius: 500%;
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

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #dba14a;
  color: white;
  position: relative;
}

.nav-links {
  display: flex;
  gap: 15px;
  padding-left: 38%;
  padding-right: 2%;
}

.nav-links a,
.nav-links .router-link-active {
  color: white;
  text-decoration: none;
}

.nav-links .active {
  font-weight: bold;
  color: #f1f1f1;
  border-bottom: 2px solid #f1f1f1;
}

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

.hamburger {
  display: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}

@media screen and (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #dba14a;
    padding: 10px;
  }

  .nav-active {
    display: flex;
  }
}
</style>