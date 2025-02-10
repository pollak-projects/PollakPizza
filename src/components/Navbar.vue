<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Router
const router = useRouter();
const route = useRoute();

// State for managing login status
const isLoggedIn = ref(false);

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

// Logout logic
const handleLogout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  router.push("/login");
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
      <router-link to="/" :class="{ active: route.path === '/' }"
        >Kezdőlap</router-link
      >
      <router-link to="/Menu" :class="{ active: route.path === '/Menu' }"
        >Pizzák</router-link
      >
      <router-link
        to="/Order"
        :class="{ active: route.path === '/Order' }"
        class="right"
        >Rendelés</router-link
      >
    </div>
    <img src="../assets/image/usericon.png" alt="user img" class="profileimg" />
  </nav>
</template>

<style scoped>
.profileimg {
  width: 2dvw;
  height: 2dvw;
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

.profile-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Add styles for active link */
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
</style>
