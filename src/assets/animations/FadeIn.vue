<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const element = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 }
  )

  if (element.value) {
    observer.observe(element.value)
  }
})

onUnmounted(() => {
  if (observer && element.value) {
    observer.unobserve(element.value)
  }
})
</script>

<template>
    <div ref="element" :class="['fade-in-section', { 'is-visible': isVisible }]">
        <slot />
    </div>
</template>

<style scoped>
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>