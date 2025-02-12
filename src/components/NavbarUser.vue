<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Router
const router = useRouter();

// Állapot a token meglétének kezelésére
const isLoggedIn = ref(false);

// Ellenőrizzük, hogy van-e token a localStorage-ban
onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;
  }
});

// Bejelentkezés logika
const handleLogin = () => {
  router.push("/login");
};

// Profil oldalra navigálás
const goToProfile = () => {
  router.push("/profile");
};

// Kijelentkezés
const handleLogout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  router.push("/login"); // Átirányítás a bejelentkező oldalra
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
      <a> Pizzák </a>
      <a> Kezdőlap </a>
      <a> Rendelés  </a>
    </div>
    <img src="../assets/image/user (2).png" alt="user img" class="profileimg" />
  </nav>
</template>

<style scoped>
.profileimg {
  width: 2%;
  height: 2%;
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
/* Stílusok a navbar-hoz */
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
  padding-right: 43%;
  padding-left: 28%;
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
</style>
