<template>
  <div class="product-item">
    <div>
      <img :src="image" class="w-100" />
    </div>
    <h5>{{ name }}</h5>
    <h6>${{ price }}</h6>
    <div class="d-flex">
      <div class="flex-grow-1">
        <button class="btn btn-primary w-100" @click="addToCart">
          ADD TO CART
        </button>
      </div>
      <div class="icon-container">
        <img src="../assets/heart-regular.svg" width="20px" height="20px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const props = defineProps({
  name: String,
  price: Number,
  image: String,
  id: Number,
});

const store = useStore();

const addToCart = () => {
  const product = {
    id: props.id,
    title: props.name,
    price: props.price,
    thumbnail: props.image,
  };
  store.dispatch("addToCart", product);
};
</script>

<style scoped>
.icon-container {
  display: flex;
  justify-content: center;
  margin-left: 20px;
}

.btn {
  padding: 5px;
  border-radius: 20px;
}
</style>
