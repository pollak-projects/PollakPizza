<template>
  <footer class="footer bg-orange-400 text-brown-700 py-4 text-center flex flex-col items-center px-8">
    <div class="flex justify-between w-full items-center">
      <div class="flex gap-8 items-center ml-4">
        <div class="flex-shrink-0">
          <h3 class="font-bold">Elérhetőség:</h3>
          <p>+36 30 123 4567</p>
        </div>
        <div class="flex-shrink-0 ml-8">
          <h3 class="font-bold">Rendelés:</h3>
          <p>Szerda - Vasárnap | 11:11 - 22:22</p>
        </div>
      </div>

      <!-- Copyright szöveg középre igazítva, a képernyő közepén -->
      <div class="copyright-text">
        <p class="text-sm">Copyright &copy; Vizsgaremek 2024</p>
      </div>

      <div class="flex gap-8 items-center ml-auto">
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
.footer {
  background-color: #f4a83d;
  color: #8b5e3b;
  width: 100%;
  z-index: 1000;
  position: relative;
  bottom: 0;
}

.flex {
  display: flex;
}

.gap-8 {
  gap: 2rem;
}

.items-center {
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  margin-left: 8px;
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
  margin-left: 2rem;
}

.ml-4 {
  margin-left: 1rem;
}

.ml-auto {
  margin-left: auto;
}

.relative {
  position: relative;
}

.copyright-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  transform: translateY(-50%);
}

.icon {
  cursor: pointer;
}
</style>