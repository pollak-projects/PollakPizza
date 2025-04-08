<template>
  <v-app>
    <v-main>
      <transition name="fade" mode="out-in">
        <div class="route-wrapper" :key="$route.fullPath">
          <router-view />
        </div>
      </transition>
    </v-main>
  </v-app>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.route-wrapper {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>