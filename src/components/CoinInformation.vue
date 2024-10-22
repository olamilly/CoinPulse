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
            <div class="my-3">
              <p
                class="description text-center"
                v-html="addTargetBlank(currency.description.en)"
              ></p>
              <div class="d-flex flex-wrap gap-4 justify-content-center">
                <a
                  v-if="currency.links.homepage[0]"
                  class="coinLink text-primary text-decoration-underline"
                  :href="currency.links.homepage[0]"
                  target="_blank"
                  >{{ currency.links.homepage[0] }}</a
                >
                <p class="fw-bolder mb-1">
                  Country of Origin:
                  <span>{{
                    currency.country_origin
                      ? currency.country_origin
                      : 'Unknown'
                  }}</span>
                </p>
                <p class="fw-bolder mb-1">
                  Genesis Date:
                  <span
                    >{{
                      new Date(currency.genesis_date).toLocaleDateString(
                        'en-US',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        },
                      )
                    }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
function addTargetBlank(html) {
  return html.replace(/<a/g, '<a target="_blank"')
}

const props = defineProps({
  mode: { type: String, required: true },
  currency: { type: Object, required: true },
})
</script>
<style scoped>
.coinLink:hover {
  cursor: pointer;
  text-decoration: underline !important;
}
</style>
