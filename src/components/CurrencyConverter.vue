<template>
  <div class="containery mx-0">
    <div class="row my-3 text-center">
      <div class="col">
        <div
          :class="
            mode === 'dark'
              ? 'card mb-4 rounded-3 shadow-sm dark'
              : 'card mb-4 rounded-3 shadow-sm'
          "
        >
          <div class="card-body">
            <h3>Convert {{ currency.symbol.toUpperCase() }} to any currency</h3>
            <div class="d-flex flex-wrap justify-content-center">
              <div
                class="dropdown-menu d-block position-static p-0 my-1 mx-1 rounded-3 shadow overflow-hidden"
                :data-bs-theme="mode === 'dark' ? 'dark' : 'light'"
              >
                <form class="d-flex p-2 bg-body-tertiary border-bottom">
                  <input
                    type="text"
                    class="form-control currency-select"
                    disabled
                    :value="currency.symbol.toUpperCase()"
                  />
                  <input
                    type="text"
                    class="form-control"
                    value="1"
                    ref="userInput"
                    @input="calculateConversion()"
                  />
                </form>
              </div>
              <div
                :class="
                  filteredSupportedCurrencies.length > 0
                    ? 'dropdown-menu d-block position-static pt-0 my-1 mx-1 rounded-3 shadow overflow-hidden'
                    : 'dropdown-menu d-block position-static py-0 my-1 mx-1 rounded-3 shadow overflow-hidden'
                "
                :data-bs-theme="mode === 'dark' ? 'dark' : 'light'"
              >
                <form
                  :class="
                    filteredSupportedCurrencies.length > 0
                      ? 'd-flex p-2 mb-2 bg-body-tertiary border-bottom'
                      : 'd-flex p-2 bg-body-tertiary border-bottom'
                  "
                >
                  <input
                    type="search"
                    class="form-control user-currency-select currency-select"
                    autocomplete="false"
                    value="USD"
                    @input="filterCurrencies($event.target.value)"
                  />
                  <input
                    type="text"
                    :value="convertedValue.toLocaleString('en-US')"
                    disabled
                    class="form-control"
                  />
                </form>
                <ul
                  v-if="filteredSupportedCurrencies.length > 0"
                  class="list-unstyled mb-0"
                >
                  <li v-for="supportedCurrency in filteredSupportedCurrencies">
                    <a
                      class="dropdown-item d-flex align-items-center gap-2 py-2"
                      @click="selectCurrencyToConvert(supportedCurrency.code)"
                    >
                      {{ supportedCurrency.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import supportedCurrencies from '../../public/supportedCurrencies'
import { ref } from 'vue'
const props = defineProps({
  mode: { type: String, required: true },
  currency: { type: Object, required: true },
})
const filteredSupportedCurrencies = ref([])
const selectedCurrency = ref('usd')
const convertedValue = ref(props.currency.market_data.current_price['usd'])
const userInput = ref()
function selectCurrencyToConvert(code) {
  filteredSupportedCurrencies.value = []
  document.querySelector('.user-currency-select').value = code.toUpperCase()
  selectedCurrency.value = code
  calculateConversion()
}
function calculateConversion() {
  if (userInput.value.value == '') {
    convertedValue.value = 0
  } else {
    convertedValue.value = (
      Number(userInput.value.value) *
      props.currency.market_data.current_price[selectedCurrency.value]
    ).toLocaleString('en-US')
  }
}
const filterCurrencies = query => {
  if (query == '') {
    filteredSupportedCurrencies.value = []
  } else {
    filteredSupportedCurrencies.value = supportedCurrencies.filter(
      function (c) {
        return (
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase())
        )
      },
    )
  }
}
</script>
<style scoped>
.dropdown-menu {
  height: fit-content;
}
.currency-select {
  width: 35% !important;
}
</style>
