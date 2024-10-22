import { ref } from 'vue'
import { useRouter } from 'vue-router'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-cg-demo-api-key': process.env.VUE_API_KEY,
  },
}
export function useFetch() {
  const router = useRouter()

  const data = ref(null)
  const isLoading = ref(true)
  async function getAllCurrencies() {
    try {
      const response = fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        options,
      )

      data.value = await (await response).json()
      isLoading.value = false
    } catch (error) {
      alert(`Error fetching data:${error}`)
      isLoading.value = false
    }
  }
  async function getCurrencyDetails(id) {
    isLoading.value = false

    try {
      const response = fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        options,
      )
      data.value = await (await response).json()
      isLoading.value = false
    } catch (error) {
      alert(`Error fetching data:${error}`)
      isLoading.value = false
    }
  }
  async function getChartData(id) {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          pointStyle: false,
          data: [],
          borderColor: '#0d6efd',
          borderWidth: 2,
        },
      ],
    })

    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`,
      options,
    )
      .then(response => response.json())
      .then(response => {
        chartData.value.labels = response.prices.map(price =>
          new Date(price[0]).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          }),
        )
        chartData.value.datasets[0].data = response.prices.map(
          price => price[1],
        )
        isLoading.value = false
        data.value = chartData.value
      })
      .catch(err => {
        alert(`Error fetching data:${err}`)
        isLoading.value = false
      })
  }
  return {
    getAllCurrencies,
    isLoading,
    data,
    getCurrencyDetails,
    getChartData,
  }
}
