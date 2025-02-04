<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const registemail = ref("");
const registpassword = ref("");
const router = useRouter();

// Handle login logic here
const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:3061/login", {
      email: registemail.value,
      password: registpassword.value,
    });
    localStorage.setItem("token", response.data.token); // Store token
    router.push({ name: "HomePage" }); // Redirect to homepage

    // Token törlése 1 perc után
    setTimeout(() => {
      localStorage.removeItem("token");
      alert("A token lejárt, kérjük jelentkezz be újra!");
      router.push({ name: "Login" }); // Redirect to login page
    }, 600000); // 6000000 ms = 10 perc
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed!");
  }
};

// Navigate to register page
const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="container">
    <div class="login-card">
      <div class="login-left">
        <h2 class="title">BEJELENTKEZÉS</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Írja be az emailjét"
              v-model="registemail"
            />
          </div>
          <div class="input-group">
            <label for="password">Jelszó</label>
            <input
              type="password"
              id="password"
              placeholder="Írja be jelszavát"
              v-model="registpassword"
            />
          </div>
          <button type="submit" class="primary-btn">BEJELENTKEZÉS</button>
        </form>
      </div>
      <div class="login-right">
        <p class="rgtxt">Nincs fiókod?</p>
        <button @click="goToRegister" class="secondary-btn">
          REGISZTRÁCIÓ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2vw;
  margin-bottom: 2dvw;
  color: white;
  font-weight: bold;
}
.rgtxt {
  font-size: 2dvw;
  color: rgb(240, 160, 55);
  font-weight: bold;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../assets/image/bgimgblr.png") no-repeat center center/cover;
  position: relative;
  flex-direction: column;
  padding: 20px;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: blur(8px);
  z-index: -1;
}

.login-card {
  display: flex;
  backdrop-filter: blur(10px);
  border: rgb(245, 159, 38) 3px solid;
  height: 70%;
  width: 70%;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.login-left,
.login-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-left {
  background-color: rgba(253, 183, 84, 0.562);
  color: white;
}
.login-left label {
  font-size: 20px;
  margin-left: 18px;
  margin-top: 20px;
  color: white;
}
.login-right {
  background: radial-gradient(
    circle,
    rgb(228, 216, 194) 20%,
    rgba(248, 200, 120, 0.9) 60%,
    rgb(240, 160, 55) 100%
  );
  color: #d35400;
}
::placeholder {
  color: gray;
  padding-left: 3px;
}
.input-group input {
  width: 100%;
  padding: 3px 12px; /* Increased padding */
  border: none;
  border-radius: 50px;
  border: 2px solid white;
  font-size: 18px; /* Larger font size */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
  min-height: 50px; /* Minimum height */
}

/* Optional: Add focus effects */
.input-group input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 159, 38, 0.3);
  transition: all 0.3s ease;
}

.primary-btn,
.secondary-btn {
  background: rgb(247, 173, 69); /* Halvány arany háttér */
  color: #f0f0f0;
  border: none;
  padding: 10px 38px; /* Nagyobb padding a gomb méretének növeléséhez */
  font-size: 18px; /* Nagyobb betűméret */
  border-radius: 200px;
  cursor: pointer;
  text-transform: uppercase; /* Szöveg nagybetűssé tétele */
  font-weight: bold; /* Félkövér szöveg */
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  width: auto;
  transition: background-color 0.3s ease; /* Sima átmenet a hover effekthez */
  box-shadow: 3px 5px 15px rgb(58, 58, 58);
}

.primary-btn {
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 200px;
  font-size: 16px;
  border-radius: 200px;
  cursor: pointer;
  margin-top: 3dvw;
  text-align: center;
  border: 3px solid white;
}
.primary-btn:hover {
  background: rgb(236, 163, 53);
}
.secondary-btn {
  background-color: rgb(240, 160, 55);
  color: white;
}
.secondary-btn:hover {
  background: rgb(207, 123, 6);
}
</style>
