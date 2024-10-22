<template>
  <section>
    <div class="containery">
      <div class="row">
        <div class="col-md-12">
          <div class="table-wrap">
            <table
              :class="
                mode == 'dark'
                  ? 'table table-dark table-borderless'
                  : 'table tl'
              "
            >
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Coin</th>
                  <th class="text-center">Price</th>
                  <th class="text-center">Market Cap</th>
                  <th class="text-center">Trading Volume</th>
                  <th class="text-start">Price Change (24h)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="currency in currencies"
                  @click="showCurrencyDetails(currency.id)"
                >
                  <td class="border-bottom-0">
                    <span>{{
                      currency.market_cap_rank.toLocaleString('en-US')
                    }}</span>
                  </td>
                  <td class="d-flex align-items-center border-bottom-0">
                    <div
                      class="img"
                      :style="{ backgroundImage: `url(${currency.image})` }"
                    ></div>
                    <div class="pl-3 email">
                      <span>{{ currency.name }}</span>
                      <span>{{ currency.symbol.toUpperCase() }}</span>
                    </div>
                  </td>
                  <td class="border-bottom-0 text-center">
                    ${{ currency.current_price.toLocaleString('en-US') }}
                  </td>
                  <td class="border-bottom-0 text-center">
                    ${{ currency.market_cap.toLocaleString('en-US') }}
                  </td>
                  <td class="border-bottom-0 text-center">
                    ${{ currency.total_volume.toLocaleString('en-US') }}
                  </td>
                  <td class="border-bottom-0 text-center">
                    <span
                      :class="
                        currency.price_change_percentage_24h > 0
                          ? 'd-flex align-items-center text-success'
                          : currency.price_change_percentage_24h < 0
                            ? 'd-flex align-items-center text-danger'
                            : 'd-flex align-items-center text-secondary'
                      "
                    >
                      <i
                        :class="
                          currency.price_change_percentage_24h > 0
                            ? 'bx bxs-up-arrow'
                            : currency.price_change_percentage_24h < 0
                              ? 'bx bxs-down-arrow'
                              : 'bx bx-minus'
                        "
                      ></i>
                      <span class="mx-2"
                        >{{
                          Math.abs(currency.price_change_percentage_24h)
                        }}%</span
                      ></span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.table-dark tbody td {
  background: none;
}
tbody > tr {
  cursor: pointer;
}
.table-dark tbody > tr:hover {
  background-color: rgb(167, 164, 164) !important;
}
.table .tl {
  background-color: white;
}
tbody > tr:hover {
  background: lightgray !important;
}
</style>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function showCurrencyDetails(currency) {
  router.push({ path: '/details', query: { currency: currency } })
}
const props = defineProps({
  mode: { type: String, required: true },
  currencies: { type: [Array, null], required: true },
})
</script>
