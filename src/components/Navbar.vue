<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Állapot a token meglétének kezelésére
const isLoggedIn = ref(false)

// Ellenőrizzük, hogy van-e token a localStorage-ban
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
  }
})

// Bejelentkezés logika
const handleLogin = () => {
  router.push('/login')
}

// Profil oldalra navigálás
const goToProfile = () => {
  router.push('/profile')
}

// Kijelentkezés
const handleLogout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')  // Átirányítás a bejelentkező oldalra
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <h2>MyApp</h2>
    </div>
    <div class="nav-links">
      <!-- Ha be van jelentkezve a felhasználó -->
      <div v-if="isLoggedIn">
        <button @click="goToProfile">
          <img src="" alt="Profile" class="profile-icon"/>
        </button>
        <button @click="handleLogout">Kijelentkezés</button>
      </div>
      <!-- Ha nincs bejelentkezve a felhasználó -->
      <div v-else>
        <button @click="handleLogin">Bejelentkezés</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Stílusok a navbar-hoz */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2575fc;
  color: white;
}

.nav-links {
  display: flex;
  gap: 15px;
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