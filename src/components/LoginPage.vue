<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const registemail = ref('');
const registpassword = ref('');
const birthdate = ref(""); 
const phonenumber = ref(""); 
const address = ref(''); 
const name = ref('');
const maxDate = new Date().toISOString().split("T")[0];
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

function validatePhone(input) {
  const pattern = /^[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{4}$/;
  if (!pattern.test(input.value)) {
    input.setCustomValidity("Kérem írjon be 12 számot: xxxxxxxxxxxx");
  } else {
    input.setCustomValidity("");
  }
}

function signIn() {
  document.getElementById('container').classList.remove('right-panel-active');
  document.getElementById('hideDiv').classList.remove('hidden');
}


onMounted(() => {
  document.getElementById('container').classList.add('loaded');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
});
onUnmounted(() => {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
});
</script>


<template>
  <body>
    <div class="container loaded" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1 class="regH1">REGISZTRÁCIÓ</h1>
          <div class="row">
            <div class="col-sm-6">
              <label>Név</label>
              <input type="text" v-model="name" placeholder="A neve" minlength="5" maxlength="35" required/>
            </div>

            <div class="col-sm-6">
  <label>Sz.Dátum</label>
  <input type="date" v-model="birthdate" class="inputdate" required :max="maxDate" />
</div>

            <div class="col-sm-6">
              <label>Jelszó</label>
              <input
                type="password"
                v-model="registpassword"
                placeholder="Jelszó"
                minlength="8"
                required
              />
            </div>

            <div class="col-sm-6">
              <label>Telefonszám</label>
              <input
              maxlength="12"
              minlength="12"
              v-model="phonenumber"
              placeholder="123456789123"
              type="tel"
              v-on:input="validatePhone($event.target)"
              required
               />


            </div>
          </div>
          <label>Email</label>
          <input
            type="email"
            v-model="registemail"
            placeholder="Példa@gmail.hu"
            required
          />
          <label>Cím</label>
          <input
            type="text"
            v-model="address"
            placeholder="Szentes, Apponyi tér 1, 6600"
            required
          />
          <button class="login" type="submit" :disabled="isLoading">
            REGISZTRÁCIÓ
          </button>
        </form>
      </div>

      <div class="form-container sign-in-container" id="hideDiv">
        <form action="#" @submit.prevent="handleLogin">
          <h1 class="loginH1">BEJELENTKEZÉS</h1>
          <label class="loginlabel">Email</label>
          <input
            class="logininput"
            type="email"
            v-model="registemail"
            placeholder="example@org.com"
            required
          />
          <label class="loginlabel">Jelszó</label>
          <input 
            class="logininput"
            type="password"
            v-model="registpassword"
            placeholder="password"
            required
          />
          <a href="/forgotpassword" class="forgotPassword">Elfelejtette a jelszavát?</a>
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
<style scoped src="../assets/css/login.css"></style>
