<template>
  <div class="wrapper">
    <HeaderNav />
    <div class="d-flex cart-container mt-2 mx-2">
      <div class="flex-grow-1">
        <div v-if="cartItems.length === 0">
          <p class="text-center">Your cart is empty.</p>
        </div>
        <table class="w-100 table" v-else>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td>
                <img
                  :src="item.thumbnail"
                  alt="product image"
                  class="cart-item-image"
                />
                <br />
                {{ item.title }}
              </td>
              <td>${{ item.price }}</td>
              <td>
                <div class="d-flex">
                  <button
                    @click="decrementQuantity(item.id)"
                    class="btn btn-sm"
                  >
                    -
                  </button>
                  <div class="mx-2">{{ item.quantity }}</div>
                  <button
                    @click="incrementQuantity(item.id)"
                    class="btn btn-sm"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${{ item.price * item.quantity }}</td>
              <td>
                <img
                  src="../assets/times-solid.svg"
                  class="remove-cart-item"
                  @click="removeFromCart(item.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-total">
        <h5>Order Summary</h5>
        <hr />
        <table class="w-100">
          <tr>
            <td>Subtotal</td>
            <td>
              <h6>${{ totalPrice }}</h6>
            </td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td><h6>Free</h6></td>
          </tr>
          <tr>
            <td colspan="2">
              <hr />
            </td>
          </tr>
          <tr>
            <td><h6>Total</h6></td>
            <td>
              <h6>${{ totalPrice }}</h6>
            </td>
          </tr>
          <tr v-if="cartItems.length != 0">
            <td colspan="2">
              <button class="btn btn-success w-100">CHECKOUT</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import HeaderNav from "../components/HeaderNav.vue";

const store = useStore();
const cartItems = computed(() => store.getters.getCart);

const incrementQuantity = (productId: number) => {
  store.dispatch("incrementQuantity", productId);
};

const decrementQuantity = (productId: number) => {
  store.dispatch("decrementQuantity", productId);
};

const removeFromCart = (productId: number) => {
  store.dispatch("removeFromCart", productId);
};

const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});
</script>
  
<style scoped>
.cart-container {
  align-items: flex-start;
}
.cart-item-image {
  width: 100px;
  height: auto;
}
.cart-total {
  width: 300px;
  margin-top: 20px;
  background-color: rgb(224, 224, 224);
  height: auto;
  padding: 15px;
}
.table {
  margin-top: 20px;
}
.remove-cart-item {
  width: 15px;
  height: 15px;
  padding: 10px;
  background-color: rgb(193, 194, 193);
  border-radius: 50%;
  cursor: pointer;
}
</style>
  