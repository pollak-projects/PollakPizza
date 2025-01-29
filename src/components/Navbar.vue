<script setup>
import { ref } from 'vue';
const isLoggedIn = ref(false);    

</script>


<template>
    <header class="header">
      <h1>PollakPizza</h1>
      <nav>
        <ul>
          <li><a href="/">Kezdőlap</a></li>
          <li><a href="/menu">Menü</a></li>
          <li><a href="/order">Rendelés</a></li>
  
          <!-- Bejelentkezés menüpont, ha a felhasználó nincs bejelentkezve -->
          <li v-if="!isLoggedIn"  @click="activeLink = '/'"><a href="/login">Bejelentkezés</a></li>
        </ul>
      </nav>
    </header>
  </template>
  
  
  <style scoped>
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
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff; /* A vonal színe */
  }
  </style>
  
  