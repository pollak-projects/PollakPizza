<template>
    <div
      ref="element"
      :class="['slide-in-left', { 'is-visible': isVisible }]"
      :style="{ animationDelay: delay }"
    >
      <slot />
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const { delay = '0s' } = defineProps({
  delay: {
    type: String,
    default: '0s' // Default no delay
  }
});

const element = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
      }
    },
    { 
      threshold: 0,           
      rootMargin: '0px 0px 0px 0px' 
    }
  );

  if (element.value) {
    observer.observe(element.value);
  }
});

onUnmounted(() => {
  if (observer && element.value) {
    observer.unobserve(element.value);
  }
});
</script>

<style scoped>
/* Initial state: move element offscreen */
.slide-in-left {
  opacity: 0;
  transform: translateX(-100%);
  visibility: hidden; /* Prevents flashing */
  transition: opacity 0.6s ease, transform 0.6s ease;
  animation-fill-mode: forwards; /* Ensures the animation's final state is applied */
}

/* When the element is in view */
.slide-in-left.is-visible {
  animation: slideIn 0.6s ease forwards;
  visibility: visible; /* Becomes visible when animation starts */
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
