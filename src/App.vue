<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/Header.vue'
const mode = ref(localStorage.getItem('mode'))
onMounted(() => {
  if (mode.value === null) {
    mode.value = 'light'
    localStorage.setItem('mode', 'light')
  }
})
const toggleMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('mode', mode.value)
}
</script>

<template>
  <div class="main-container">
    <HeaderComponent :mode="mode" @toggle-mode="toggleMode" />
    <RouterView :mode="mode" />
  </div>
</template>

<style scoped>
.main-container {
  min-height: inherit;
  height: 100%;
  /* background-color: rgb(128, 128, 128) */
}
</style>
