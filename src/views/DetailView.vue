<script setup>
import { useFetch } from '@/composables/useFetch'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CoinInformation from '@/components/CoinInformation.vue'
import CoinMarketData from '@/components/CoinMarketData.vue'
import CurrencyConverter from '@/components/CurrencyConverter.vue'
const router = useRouter()
const route = useRoute()
const { isLoading, data: currencyDetails, getCurrencyDetails } = useFetch()
const props = defineProps({
  mode: { type: String, required: true },
})

onMounted(async () => {
  const currencyId = String(route.query.currency)
  if (currencyId) {
    await getCurrencyDetails(currencyId)
  } else {
    router.push('/')
  }
  window.scrollTo(0, 0)
})
function goBack() {
  router.push('/')
}
const navTopic = ref('Market Data')

function changeNavTopic(e) {
  var topicElements = [...e.target.parentElement.children]
  topicElements.forEach(i => {
    i.classList.remove('active')
    i.classList.remove('link-body-emphasis')
  })
  e.target.classList.add('active')
  e.target.classList.add('link-body-emphasis')
  navTopic.value = e.target.innerText
}
</script>
<template>
  <main :class="mode === 'dark' ? 'details dark' : 'details'">
    <div
      v-if="currencyDetails"
      :class="
        mode == 'dark' ? 'btn btn-sm mt-4 mb-2 dark' : 'btn btn-sm mt-4 mb-2'
      "
    >
      <p
        class="mb-0 d-flex align-items-center justify-content-center"
        @click="goBack()"
      >
        <i class="bx bx-arrow-back me-2"></i>
        <span>Go Back</span>
      </p>
    </div>

    <div v-if="!currencyDetails" class="w-100 d-flex justify-content-center">
      <div
        :class="
          mode == 'dark'
            ? 'spinner-border text-light'
            : 'spinner-border text-dark'
        "
        role="status"
      ></div>
    </div>

    <section v-else class="m-5">
      <div v-if="currencyDetails">
        <div
          class="d-flex flex-wrap align-items-center justify-content-between"
        >
          <div
            class="coinHeader d-flex flex-wrap align-items-center justify-content-center"
          >
            <div class="">
              <img
                :alt="`${currencyDetails.name} Logo`"
                :src="currencyDetails.image.large"
                height="200px"
              />
            </div>
            <div class="">
              <div>
                <p class="fw-bolder coinName mb-0">
                  {{ currencyDetails.name }}
                </p>
                <p class="coinCode">
                  {{ currencyDetails.symbol.toUpperCase() }}
                </p>
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap justify-content-center coinPrice">
            <h1>
              ${{
                currencyDetails.market_data.current_price.usd.toLocaleString(
                  'en-US',
                )
              }}
            </h1>
            <span
              :class="
                currencyDetails.market_data.price_change_percentage_24h > 0
                  ? 'coinStat d-flex align-items-center justify-content-center text-success'
                  : currencyDetails.market_data.price_change_percentage_24h < 0
                    ? 'coinStat d-flex align-items-center justify-content-center text-danger'
                    : 'coinStat d-flex align-items-center justify-content-center text-secondary'
              "
            >
              <i
                :class="
                  currencyDetails.market_data.price_change_percentage_24h > 0
                    ? 'bx bxs-up-arrow'
                    : currencyDetails.market_data.price_change_percentage_24h <
                        0
                      ? 'bx bxs-down-arrow'
                      : 'bx bx-minus'
                "
              ></i>
              <span class="mx-2"
                >{{
                  Math.abs(
                    currencyDetails.market_data.price_change_percentage_24h,
                  )
                }}% (24h)</span
              ></span
            >
          </div>
          <div
            class="d-flex justify-content-center gap-4 text-center mt-2 w-100"
          >
            <p class="fw-bolder mx-3">
              All Time Low:
              <span
                >${{
                  currencyDetails.market_data.atl.usd.toLocaleString('en-US')
                }}
                <br />
                ({{
                  new Date(
                    currencyDetails.market_data.atl_date.usd,
                  ).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                }})</span
              >
              <span
                :class="
                  currencyDetails.market_data.atl_change_percentage.usd > 0
                    ? 'd-flex align-items-center justify-content-center text-success'
                    : currencyDetails.market_data.atl_change_percentage.usd < 0
                      ? 'd-flex align-items-center justify-content-center text-danger'
                      : 'd-flex align-items-center justify-content-center text-secondary'
                "
              >
                <i
                  :class="
                    currencyDetails.market_data.atl_change_percentage.usd > 0
                      ? 'bx bxs-up-arrow'
                      : currencyDetails.market_data.atl_change_percentage.usd <
                          0
                        ? 'bx bxs-down-arrow'
                        : 'bx bx-minus'
                  "
                ></i>
                <span class="mx-2"
                  >{{
                    Math.abs(
                      currencyDetails.market_data.atl_change_percentage.usd,
                    )
                  }}%</span
                ></span
              >
            </p>
            <p class="fw-bolder mx-3">
              All Time High:
              <span
                >${{
                  currencyDetails.market_data.ath.usd.toLocaleString('en-US')
                }}
                <br />
                ({{
                  new Date(
                    currencyDetails.market_data.ath_date.usd,
                  ).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                }})</span
              ><span
                :class="
                  currencyDetails.market_data.ath_change_percentage.usd > 0
                    ? 'd-flex align-items-center justify-content-center text-success'
                    : currencyDetails.market_data.ath_change_percentage.usd < 0
                      ? 'd-flex align-items-center justify-content-center text-danger'
                      : 'd-flex align-items-center justify-content-center text-secondary'
                "
              >
                <i
                  :class="
                    currencyDetails.market_data.ath_change_percentage.usd > 0
                      ? 'bx bxs-up-arrow'
                      : currencyDetails.market_data.ath_change_percentage.usd <
                          0
                        ? 'bx bxs-down-arrow'
                        : 'bx bx-minus'
                  "
                ></i>
                <span class="mx-2"
                  >{{
                    Math.abs(
                      currencyDetails.market_data.ath_change_percentage.usd,
                    )
                  }}%</span
                ></span
              >
            </p>
          </div>
        </div>
        <nav class="nav my-3 nav-underline justify-content-evenly">
          <a
            class="nav-item nav-link link-body-emphasis active"
            @click="changeNavTopic($event)"
            >Market Data</a
          ><a
            class="nav-item nav-link cursor-pointer"
            @click="changeNavTopic($event)"
            >Coin Info</a
          ><a
            class="nav-item nav-link cursor-pointer"
            @click="changeNavTopic($event)"
            >Converter</a
          >
        </nav>
        <CoinMarketData
          :mode="mode"
          :currency="currencyDetails"
          v-if="navTopic == 'Market Data'"
        />
        <CoinInformation
          :mode="mode"
          :currency="currencyDetails"
          v-if="navTopic == 'Coin Info'"
        />
        <CurrencyConverter
          :mode="mode"
          :currency="currencyDetails"
          v-if="navTopic == 'Converter'"
        />
        <p class="w-100 text-center">
          Porewed By
          <a href="https://www.coingecko.com/" target="_blank">CoinGecko</a>
        </p>
      </div>
    </section>
  </main>
</template>
<style lang="css" scoped>
.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn-sm {
  align-self: start;
}
nav > a {
  cursor: pointer;
}
h1 {
  font-size: 4rem !important;
}
.coinName {
  font-size: 3.5rem;
}
main.dark .active {
  color: white !important;
  border-color: white;
}
@media (max-width: 507px) {
  .coinCode {
    text-align: center;
  }
}
@media (max-width: 850px) {
  .coinPrice,
  .coinHeader,
  .coinStat {
    width: 100%;
  }
}
</style>
