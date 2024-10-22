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
            <Line v-else :data="chartData" :options="chartOptions" />

            <span
              :class="
                currency.market_data.price_change_percentage_7d > 0
                  ? 'd-flex align-items-center justify-content-center text-success'
                  : currency.market_data.price_change_percentage_7d < 0
                    ? 'd-flex align-items-center justify-content-center text-danger'
                    : 'd-flex align-items-center justify-content-center text-secondary'
              "
            >
              <i
                :class="
                  currency.market_data.price_change_percentage_7d > 0
                    ? 'bx bxs-up-arrow'
                    : currency.market_data.price_change_percentage_7d < 0
                      ? 'bx bxs-down-arrow'
                      : 'bx bx-minus'
                "
              ></i>
              <span class="mx-2"
                >{{
                  Math.abs(currency.market_data.price_change_percentage_7d)
                }}% (7d)</span
              ></span
            >
            <div class="d-flex flex-wrap justify-content-around">
              <p class="fw-bolder mx-2">
                Market Cap Rank:
                <span>#{{ currency.market_data.market_cap_rank }}</span>
              </p>
              <p class="fw-bolder mx-2">
                Market Cap:
                <span
                  >${{
                    currency.market_data.market_cap.usd.toLocaleString('en-US')
                  }}</span
                >
              </p>
            </div>
            <div class="d-flex flex-wrap justify-content-around">
              <p class="fw-bolder mx-2">
                Max Supply:

                <span
                  >{{
                    currency.market_data.max_supply
                      ? `${currency.market_data.max_supply.toLocaleString('en-US')} ${currency.symbol.toUpperCase()}`
                      : '∞'
                  }}
                </span>
              </p>
              <p class="fw-bolder mx-2">
                Circulating Supply:
                <span
                  >{{
                    currency.market_data.circulating_supply.toLocaleString(
                      'en-US',
                    )
                  }}
                  {{ currency.symbol.toUpperCase() }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script setup>
import { onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
const props = defineProps({
  mode: { type: String, required: true },
  currency: { type: Object, required: true },
})
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
const chartOptions = ref({
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: `${props.currency.name} Price Change (7 days)`,
      color: 'gray',
      align: 'center',
      font: { weight: 'bold', size: 18 },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (val, index) {
          return '$' + val
        },
        color: 'gray',
      },
    },
    x: {
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val, index) {
          // Show every 5th tick label
          return index % 2 === 0 ? this.getLabelForValue(val) : ''
        },
        color: 'gray',
      },
    },
  },
})
import { useFetch } from '@/composables/useFetch'

const { isLoading, data: chartData, getChartData } = useFetch()

onMounted(async () => {
  await getChartData(props.currency.id, props.currency.name)
})
</script>
