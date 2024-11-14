import { createStore } from "vuex";

const store = createStore({
  state: {
    searchText: '',
    selectedCategories: [] as string[],
    products: [] as any[], 
    cart: [] as any[], 
  },
  mutations: {
    setSearchText(state, searchText: string) {
      state.searchText = searchText;
    },
    setSelectedCategories(state, categories: string[]) {
      state.selectedCategories = categories;
    },
    setProducts(state, products: any[]) {
      state.products = products;
    },
    setCart(state, cart: any[]) {
      state.cart = cart;
    },
    addToCart(state, product: any) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1; 
      } else {
        state.cart.push({ ...product, quantity: 1 }); 
      }
    },
    removeFromCart(state, productId: number) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    incrementQuantity(state, productId: number) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity(state, productId: number) {
      const product = state.cart.find(item => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
  actions: {
    updateSearchText({ commit }, searchText: string) {
      commit("setSearchText", searchText);
    },
    updateSelectedCategories({ commit }, categories: string[]) {
      commit("setSelectedCategories", categories);
    },
    fetchProducts({ commit }) {
      fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
          commit("setProducts", data.products);
        })
        .catch(error => console.error("Error fetching products:", error));
    },
    addToCart({ commit }, product: any) {
      commit("addToCart", product); 
    },
    removeFromCart({ commit }, productId: number) {
      commit("removeFromCart", productId); 
    },
    incrementQuantity({ commit }, productId: number) {
      commit("incrementQuantity", productId); 
    },
    decrementQuantity({ commit }, productId: number) {
      commit("decrementQuantity", productId); 
    },
  },
  getters: {
    getSearchText: (state) => state.searchText,
    getSelectedCategories: (state) => state.selectedCategories,
    getProducts: (state) => state.products,
    getCart: (state) => state.cart,
    getTotalPrice: (state) => {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export default store;
