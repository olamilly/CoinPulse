<script setup>
import { onMounted, ref } from 'vue'
import FilterBar from '@/components/FilterBar.vue'
import TableComponent from '@/components/Table.vue'
const props = defineProps({
  mode: { type: String, required: true },
})
import { useFetch } from '@/composables/useFetch'
const { getAllCurrencies, isLoading, data: allCurrencies } = useFetch()
const filteredCurrencies = ref([])
onMounted(async () => {
  await getAllCurrencies()
  filteredCurrencies.value = allCurrencies.value
})
const filterCurrenciesBySearchQuery = query => {
  if (query == '') {
    filteredCurrencies.value = allCurrencies.value
  } else {
    filteredCurrencies.value = allCurrencies.value.filter(function (c) {
      return (
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.includes(query.toLowerCase())
      )
    })
  }
}
</script>

<template>
  <main :class="mode == 'dark' ? 'home dark' : 'home'">
    <FilterBar
      v-if="!isLoading"
      @search-query="filterCurrenciesBySearchQuery"
      :mode="mode"
    />
    <div v-if="isLoading" class="w-100 d-flex justify-content-center">
      <div
        :class="
          mode == 'dark'
            ? 'spinner-border text-light'
            : 'spinner-border text-dark'
        "
        role="status"
      ></div>
    </div>

    <section v-else>
      <h1>
        <span>Top</span>
        <span class="d-flex flex-wrap align-items-center bt-container">
          <span class="branded-text">Crypto </span>
          <span class="branded-text">currencies </span>
        </span>

        <span>by</span>
        <span class="d-flex flex-wrap align-items-center text-primary">
          Market Cap📈
        </span>
      </h1>
      <TableComponent :mode="mode" :currencies="filteredCurrencies" />
      <p class="w-100 text-center">
        Porewed By
        <a href="https://www.coingecko.com/" target="_blank">CoinGecko</a>
      </p>
    </section>
  </main>
</template>
<style lang="css" scoped>
h1 {
  font-size: 4rem;
}
h1 > span {
  font-weight: 500;
  line-height: 1.2;
  color: var(--bs-heading-color);
}
@media (min-width: 768px) {
  h1 {
    display: flex;
    font-size: 6rem;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .branded-text {
    font-size: 6rem;
  }
  h1 > span {
    flex-wrap: nowrap !important;
  }
  .bt-container {
    align-self: flex-end;
  }
}
</style>
