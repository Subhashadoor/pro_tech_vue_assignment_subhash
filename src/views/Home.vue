<template>
  <div class="wrapper">
    <HeaderNav />
    <div class="d-flex">
      <div class="flex-grow-1">
        <div class="d-flex px-2">
          <input
            type="text"
            class="form-control"
            v-model="searchText"
            placeholder="Search"
            @input="updateSearchText"
          />
        </div>
      </div>
      <div class="px-2" style="position: relative">
        <button class="btn btn-success" @click="toggleFilterBox">Filter</button>
        <div class="filter-box" v-show="showFilterBox">
          <h5>All Category</h5>
          <img
            src="../assets/times-solid.svg"
            class="filter-box-close"
            @click="toggleFilterBox"
          />
          <input
            type="checkbox"
            id="beauty"
            name="beauty"
            value="beauty"
            class="mx-2"
            v-model="selectedCategories"
            @change="updateSelectedCategories"
          />
          <label for="beauty"> Beauty</label><br />
          <input
            type="checkbox"
            id="fragrances"
            name="fragrances"
            value="fragrances"
            class="mx-2"
            v-model="selectedCategories"
            @change="updateSelectedCategories"
          />
          <label for="fragrances"> Fragrances</label><br />
        </div>
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-item" v-for="product in filteredProducts" :key="product">
        <ProductItem
          :name="product.title"
          :price="product.price"
          :image="product.thumbnail"
          :id="product.id"
        />
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ProductItem from "../components/ProductItem.vue";
import HeaderNav from "../components/HeaderNav.vue";

const store = useStore();

const searchText = computed({
  get: () => store.getters.getSearchText,
  set: (value: string) => store.dispatch("updateSearchText", value),
});

const selectedCategories = computed({
  get: () => store.getters.getSelectedCategories,
  set: (categories: string[]) =>
    store.dispatch("updateSelectedCategories", categories),
});

const showFilterBox = ref(false);

const filteredProducts = computed(() => {
  const products = store.state.products;
  return products.filter((product: any) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchText.value.toLowerCase());

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.some(
        (category) => product.category.toLowerCase() === category.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });
});

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    store.state.products = data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const toggleFilterBox = () => {
  showFilterBox.value = !showFilterBox.value;
};

const updateSearchText = (event: Event) => {
  store.dispatch("updateSearchText", (event.target as HTMLInputElement).value);
};

const updateSelectedCategories = () => {
  store.dispatch("updateSelectedCategories", selectedCategories.value);
};
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
}
.filter-box {
  width: 300px;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #bdbdbd;
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
}
.filter-box-close {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

.grid-item {
  background-color: none;
  padding: 16px;
  text-align: left;
}
</style>