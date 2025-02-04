<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const isLoggedIn = ref(false);
const registname = ref("");
const registemail = ref("");
const registpassword = ref("");
const registbirth = ref("");
const registaddress = ref("");
const registadmin = ref(0);
const registphone = ref("");
const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};

const handleRegister = async () => {
  try {
    const response = await axios.post("http://localhost:3061/register", {
      name: registname.value,
      email: registemail.value,
      password: registpassword.value,
      birthdate: registbirth.value,
      address: registaddress.value,
      admin: registadmin.value,
      phonenumber: registphone.value,
    });
    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

<template>
  <div class="container">
    <div class="container-border">
      <div class="left-reg">
        <h1 style="font-size: 2dvw">Már van fiókod?</h1>
        <button @click="goToLogin()" class="primary-btn">Bejelentkezés</button>
      </div>
      <div class="right-reg">
        <form @submit.prevent="handleRegister">
          <h1 style="margin-bottom: 24px">REGISZTRÁCIÓ</h1>
          <div class="inputflex">
            <div class="input-group">
              <label for="name">Név</label>
              <input
                type="text"
                id="name"
                placeholder="Írd be a neved címed"
                v-model="registname"
              />
            </div>
            <div class="input-group">
              <label for="birthdate">Szül. dátum</label>
              <input
                type="date"
                id="birthdate"
                v-model="registbirth"
              />
            </div>
          </div>
          <div class="inputflex">
            <div class="input-group">
              <label for="password">Jelszó</label>
              <input
                type="password"
                id="password"
                placeholder="Írd be a jelszót"
                v-model="registpassword"
              />
            </div>
            <div class="input-group">
              <label for="phone">Telefonszám</label>
              <input
                type="text"
                id="phonenumber"
                placeholder="Írd be a telefonszámod"
                v-model="registphone"
              />
            </div>
          </div>
          <div class="input-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Írd be az email címed"
              v-model="registemail"
            />
          </div>
          <div class="input-group">
            <label for="address">Cím</label>
            <input
              type="text"
              id="address"
              placeholder="Adja meg a címét"
              v-model="registaddress"
            />
          </div>
          <button type="submit" class="primary-btn">Regisztráció</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-datetime-edit-year-field {
  color: gray;
  padding-left: 10px;
}

input[type="date"]::-webkit-datetime-edit-text,
input[type="date"]::-webkit-datetime-edit-month-field,
input[type="date"]::-webkit-datetime-edit-day-field{
  color: gray;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../assets/image/bgimgblr.png") no-repeat center center/cover;
  overflow: unset;
  position: relative; /* Needed for the pseudo-element */
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit; /* Inherit the background image */
  filter: blur(10px); /* Apply blur effect */
  z-index: -1; /* Place it behind the content */
}
.container-border {
  display: flex;
  backdrop-filter: blur(10px);
  border: rgb(245, 159, 38) 3px solid;
  width: 70%;
  height: 70%;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.left-reg {
  background-color: rgba(248, 189, 107, 0.377);
}
.right-reg {
  background-color: rgba(255, 174, 60, 0.726);
}
.left-reg,
.right-reg {
  flex: 1;
  padding: 80px;
  text-align: center;
  align-items: center;
}

.left-reg h1 {
  font-weight: normal;
  margin-top: 40%;
  color: white; /* Ensure text is visible */
}

.left-reg button, .right-reg button {
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
.right-reg button {
  background: rgba(231, 193, 139, 0.61);
  border: 3px white solid;
  font-size: 23px;
}
.left-reg button:hover {
  background: rgb(207, 123, 6); 
}

.right-reg h1 {
  font-size: 40px;
  color: white; /* Ensure text is visible */
}
.inputflex {
  display: flex;
  gap: 15px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 20px;
  margin-left:18px;
  color: white; /* Ensure text is visible */
}

.input-group input {
  padding: 7px;
  border-radius: 50px;
  border: 2px solid white;
  color: white; /* Ensure text is visible */
  outline: none;
}

.primary-btn {
  width: 100%;
  background: white;
  color: #d98a36;
  padding: 12px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
}
::placeholder {
  color: gray;
  padding-left: 10px;
}
a.active {
  font-weight: bold; /* Optional: Make the active link bold */
  border-bottom: 2px solid #fae4df; /* Optional: Add a bottom border to indicate active link */
  padding-bottom: 5px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

header h1 {
  margin: 0;
}

header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

header nav ul li {
  margin-right: 10px;
  position: relative;
}

header nav ul li a {
  color: #fff;
  text-decoration: none;
}

header nav ul li.active a {
  font-weight: bold;
}

header nav ul li.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fff; /* A vonal színe */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Arial", sans-serif;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

h2 {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  margin-top: 2px;
  font-weight: bold;
  font-size: 14px;
  display: block;
  color: #333;
}

input {
  width: 100%;
  border: 1px solid #ccc;
  color: black;
  font-size: 16px;
  transition: border-color 0.3s ease;
  border-radius: 20px;
  padding: 10px;
}

input:focus {
  outline: none;
  border-color: #2575fc;
}

button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}


</style>
