<template>
  <footer
    class="bg-orange-400 text-brown-700 py-4 text-center flex flex-col px-4 relative"
  >
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="font-bold">Elérhetőség:</h3>
        <p>+36 30 123 4567</p>
      </div>
      <div class="footer-section">
        <h3 class="font-bold">Rendelés:</h3>
        <p>Szerda - Vasárnap | 11:11 - 22:22</p>
      </div>

      <div class="copyright-text">
        <p class="text-sm">Copyright &copy; Vizsgaremek 2024</p>
      </div>

      <div class="footer-section social">
        <p>Ha a pizzánk levettek a lábadról, akkor kövess be minket:</p>
        <div class="icons">
          <img src="../assets/image/facebook.png" alt="Facebook" class="icon" />
          <img
            src="../assets/image/instagram.png"
            alt="Instagram"
            class="icon"
          />
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
/* General styles */
.bg-orange-400 {
  background-color: #f4a83d;
}
.text-brown-700 {
  color: #8b5e3b;
}
.text-sm {
  font-size: 0.875rem;
}

/* Layout adjustments */
.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  text-align: center;
  margin-bottom: 1rem;
}
.social {
  padding-top: 1dvw;
}
/* Center the copyright text */
.copyright-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
}

/* Social media icons */
.icons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* Responsive styles */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .copyright-text {
    position: static;
    transform: none;
    margin-top: 1rem;
  }

  .footer-section {
    min-width: auto;
  }
}
</style>
