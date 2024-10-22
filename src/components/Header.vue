<script setup>
import { RouterLink } from 'vue-router'
const emit = defineEmits(['toggleMode'])
const props = defineProps({
  mode: { type: String, required: true },
})
</script>

<template>
  <header :class="mode == 'dark' ? 'py-3 dark' : 'py-3'">
    <div class="mx-3">
      <div class="d-flex align-items-center justify-content-between">
        <RouterLink
          to="/"
          :class="
            mode == 'light'
              ? 'd-flex align-items-center fw-800 text-black text-start text-decoration-none '
              : 'd-flex align-items-center fw-800 text-start text-decoration-none light'
          "
        >
          <img
            v-if="mode == 'dark'"
            alt="CoinPulse logo"
            class="logo"
            src="@/assets/logo-light.svg"
          />
          <img
            v-if="mode == 'light'"
            alt="CoinPulse logo"
            class="logo"
            src="@/assets/logo-dark.svg"
          />
          <span class="brand-name mx-2">CoinPulse</span>
        </RouterLink>

        <div
          :class="
            mode == 'dark'
              ? 'btn btn-sm header-end dark'
              : 'btn btn-sm header-end'
          "
          @click="emit('toggleMode')"
        >
          <i
            :class="
              mode == 'light'
                ? 'bx bx-moon px-2 fw-600'
                : 'bx bx-sun px-2 fw-600'
            "
          ></i>
          <span class="fw-600" v-if="mode == 'light'">Dark Mode</span>
          <span class="fw-600 light" v-else>Light Mode</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: hsl(0, 0%, 100%);
}
.bx-sun,
.light {
  color: white;
}
.dark {
  background-color: hsl(207, 26%, 17%);
}
</style>
