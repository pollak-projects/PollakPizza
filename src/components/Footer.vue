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


      <div class="footer-section social">
        <p>Ha a pizzánk levettek a lábadról, akkor kövess be minket:</p>
        <div class="icons">
          <img src="../assets/image/facebook.png" alt="Facebook" class="icon" draggable="false"/>
          <img
            src="../assets/image/instagram.png"
            alt="Instagram"
            class="icon"
            draggable="false"
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

<style scoped src="../assets/css/footer.css"></style>