<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const registemail = ref('');
const registpassword = ref('');
const birthdate = ref(""); // Születési dátum
const phonenumber = ref(""); // Telefonszám
const address = ref(''); // Cím
const name = ref(''); // Név

const router = useRouter();
const isLoading = ref(false);

// Handle login logic here
const handleLogin = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post('http://localhost:3061/login', {
      email: registemail.value,
      password: registpassword.value,
    });
    localStorage.setItem('token', response.data.token);
    router.push({ name: 'HomePage' });

    setTimeout(() => {
      localStorage.removeItem('token');
      alert('A token lejárt, kérjük jelentkezz be újra!');
      router.push({ name: 'Login' });
    }, 600000); // 600000 ms = 10 perc
  } catch (error) {
    console.error('Login error:', error);
    alert(
      `Login failed: ${
        error.response ? error.response.data.message : error.message
      }`
    );
  } finally {
    isLoading.value = false;
  }
};

// Handle sign-up logic here
const handleSignUp = async () => {
  try {
    isLoading.value = true; // Set loading to true
    const response = await axios.post('http://localhost:3061/register', {
      name: name.value,
      birthdate: birthdate.value,
      phonenumber: phonenumber.value,
      email: registemail.value,
      address: address.value,
      password: registpassword.value,
    });


    // Ha sikerült a regisztráció, pl. egy üzenetet jeleníthetünk meg
    console.log('Regisztráció sikeres:', response.data);
    alert('Sikeres regisztráció!');

    // Visszairányítjuk a felhasználót a bejelentkezéshez
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Regisztráció hiba:', error);
    // Hiba esetén megjeleníthetünk egy üzenetet a felhasználónak
    alert('Hiba történt a regisztráció során! Kérjük próbálja újra.');
  } finally {
    isLoading.value = false; // Set loading to false after operation
  }
};

// Handle panel switching logic here
function signUp() {
  document.getElementById('container').classList.add('right-panel-active');
  document.getElementById('hideDiv').classList.add('hidden');
}

function signIn() {
  document.getElementById('container').classList.remove('right-panel-active');
  document.getElementById('hideDiv').classList.remove('hidden');
}

onMounted(() => {
  document.getElementById('container').classList.add('loaded');
});
</script>

<template>
  <body id="body">
    <div class="container loaded" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1 class="regH1">REGISZTRÁCIÓ</h1>
          <div class="row">
            <div class="col-sm-6">
              <label>Név</label>
              <input type="text" v-model="name" placeholder="John Doe" />
            </div>

            <div class="col-sm-6">
              <label>Születési Dátum</label>
              <input type="date" v-model="birthdate" />
            </div>

            <div class="col-sm-6">
              <label>Jelszó</label>
              <input
                type="password"
                v-model="registpassword"
                placeholder="password"
              />
            </div>

            <div class="col-sm-6">
              <label>Telefonszám</label>
              <input type="text" v-model="phonenumber" placeholder="+36301234567" />
            </div>
          </div>
          <label>Email</label>
          <input
            type="email"
            v-model="registemail"
            placeholder="example@pollakpizza.hu"
          />
          <label>Cím</label>
          <input
            type="text"
            v-model="address"
            placeholder="Szentes, Apponyi tér 1, 6600"
          />
          <button class="login" type="submit" :disabled="isLoading">
            REGISZTRÁCIÓ
          </button>
        </form>
      </div>

      <div class="form-container sign-in-container" id="hideDiv">
        <form action="#" @submit.prevent="handleLogin">
          <h1 class="loginH1">BEJELENTKEZÉS</h1>
          <label>Email</label>
          <input
            type="email"
            v-model="registemail"
            placeholder="example@org.com"
          />
          <label>Jelszó</label>
          <input
            type="password"
            v-model="registpassword"
            placeholder="password"
          />
          <a href="#" class="forgotPassword">Elfelejtette a jelszavát?</a>
          <button class="login" :disabled="isLoading">BEJELENTKEZÉS</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left" id="hideDiv">
            <h1 class="textDark mg-b-5">Már van fiókod?</h1>
            <button class="register" id="signIn" @click="signIn()">
              BEJELENTKEZÉS
            </button>
          </div>

          <div class="overlay-panel overlay-right">
            <h1 class="textDark mg-b-5">Nincs fiókod?</h1>
            <button class="register" id="signUp" @click="signUp()">
              REGISZTRÁCIÓ
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");

* {
  box-sizing: border-box;
  font-family: "Lato";
  font-weight: bolder;
}

body {
  background: url("../assets/image/pizza-oven-dark.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: -20px 0 50px;
}

.login {
  height: 10%;
  background-color: rgba(255, 236, 210, 0.3);
  border: 4px solid #ffecd2;
  color: #ffecd2;
  width: 50%;
  font-weight: bolder;
  font-size: 16px;
  border-radius: 90px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.login:hover {
  background-color: #ffecd2;
  color: #9b6600;
}

.register {
  height: 10%;
  background-color: #f7ad45;
  border: 4px solid #f7ad45;
  border-radius: 90px;
  color: #ffecd2;
  font-weight: bolder;
  font-size: 16px;
  width: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.col-sm-6 {
  flex: 0 0 auto;
  width: 50%;
  padding: 4px;
}

.row {
  --bs-gutter-x: 1rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}

.register:hover {
  background-color: #e19325;
  border: 4px solid #e19325;
}

h1 {
  font-weight: bold;
  margin: 0;
  color: #fff1d7;
}

.loginH1 {
  margin-bottom: 30px;
}

.regH1 {
  margin-bottom: 30px;
}

.forgotPassword {
  margin-top: 50px;
}

.textDark {
  color: #f7ad45;
}

a {
  color: #fff1d7;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  text-decoration: underline;
  font-weight: bold;
}

form {
  background: radial-gradient(
    circle,
    rgba(249, 164, 46, 1) 0%,
    rgba(247, 173, 69, 0.8) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 90px;
  height: 100%;
  text-align: center;
}

input {
  background-color: rgba(255, 255, 255, 0);
  width: 100%;
  padding: 12px;
  border: 2px solid #fff1d7;
  border-radius: 25px;
  color: #fff1d7;
  font-weight: bolder;
  font-size: 16px;
  transition: border-color 0.3s ease;
  height: 40px;
  margin-bottom: 20px;
}

input:focus {
  outline: none;
  border-color: rgb(209, 209, 209);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-weight: bolder;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(100%);
}

label {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 5px;
  display: flex;
  color: #fff1d7;
  font-weight: bold;
  align-self: start;
  flex-direction: start;
  margin-left: 15px;
}

.container {
  background-color: radial-gradient(
    circle,
    rgba(249, 164, 46, 1) 0%,
    rgba(247, 173, 69, 0.8) 100%
  );
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 45px;
  position: relative;
  overflow: hidden;
  /*a kezelofelulet merete itt allithato*/
  width: 1200px;
  height: 600px;
  max-width: 100%;
  min-height: 480px;
  /*Betöltés effekt*/
  opacity: 0;
  transition: opacity 5s ease-in-out;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
  background: radial-gradient(
    circle,
    rgba(255, 226, 171, 1) 0%,
    rgba(255, 207, 115, 1) 100%
  );
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
  background: radial-gradient(
    circle,
    rgba(255, 226, 171, 1) 0%,
    rgba(255, 207, 115, 1) 100%
  );
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.hidden {
  opacity: 0;
}

.mg-b-5 {
  margin: 20px;
}

.loaded {
  opacity: 1;
}
</style>
