<script></script>

<template>
  <footer class="bg-orange-400 text-brown-700 py-4 text-center flex flex-col items-center px-8">
    <div class="flex justify-between w-full items-center">
      <div class="flex gap-8 items-center">
        <div class="flex-shrink-0">
          <h3 class="font-bold">Elérhetőség:</h3>
          <p>+36 30 123 4567</p>
        </div>
        <div class="flex-shrink-0 ml-8">
          <h3 class="font-bold">Rendelés:</h3>
          <p>Szerda - Vasárnap | 11:11 - 22:22</p>
        </div>
      </div>
      <div class="w-full text-center mt-4">
      <p class="text-sm">Copyright &copy; Vizsgaremek 2024</p>
    </div>
      <div class="flex gap-8 items-center">
        <div>
          <p>Ha a pizzánk levettek a lábadról, akkor kövess be minket:</p>
          <img src="../assets/image/facebook.png" alt="Facebook" class="icon">
          <img src="../assets/image/instagram.png" alt="Instagram" class="icon">
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.bg-orange-400 {
  background-color: #f4a83d;
}
.text-brown-700 {
  color: #8b5e3b;
}
.flex {
  display: flex;
}
.gap-8 {
  gap: 2rem; /* Adjust the gap as needed */
}
.items-center {
  align-items: center;
}
.icon {
  width: 24px; /* Adjust the size as needed */
  height: 24px; /* Adjust the size as needed */
  margin-left: 8px; /* Adjust the spacing as needed */
}
.w-full {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
.mt-4 {
  margin-top: 1rem;
}
.flex-shrink-0 {
  flex-shrink: 0;
  white-space: nowrap;
}
.ml-8 {
  margin-left: 2rem; /* Adjust the margin as needed */
}
</style>