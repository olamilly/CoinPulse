<script setup>
const emit = defineEmits(['searchQuery'])
function filterCurrenciesBySearch(query) {
  emit('searchQuery', query)
}

const props = defineProps({
  mode: { type: String, required: true },
})
</script>
<template>
  <div class="my-3">
    <div class="row">
      <div
        class="form-group has-search d-flex align-items-center col-sm-12 col-md-6"
      >
        <i class="bx bx-search-alt-2 form-control-feedback"></i>
        <input
          type="text"
          :class="mode == 'dark' ? 'form-control dark' : 'form-control'"
          placeholder="Search for a currency..."
          @input="filterCurrenciesBySearch($event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.has-search .form-control {
  padding-left: 2.375rem;
}
@media (min-width: 768px) {
  .dropdown {
    justify-content: flex-end;
    margin: 0px !important;
  }
  .dropdown-toggle {
    font-size: inherit;
  }
}
.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}
.bx-search-alt-2 {
  font-size: 20px !important;
}
</style>
