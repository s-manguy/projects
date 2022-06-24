import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    copyright: "© 2022 La belle vue - Realisation de Sandrine MANGUY d'après une idée d'Alexia Toulmet",
    restaurantName: "La belle vue",
    shoppingCart: 0,
    simpleMenu: [
      {
        id:1,
        name: "Croissant",
        image: {
          source: "/images/croissant.jpg",
          alt: "Un croissant"
        },
        inStock: true,
        quantity: 1,
        price: 2.99
      },
      {
        id:2,
        name: "Baguette de pain",
        image: {
          source: "/images/french-baguette.jpeg",
          alt: "Quatre baguettes de pain"
        },
        inStock: true,
        quantity: 1,
        price: 3.99
      },
      {
        id:3,
        name: "Éclair",
        image: {
          source: "/images/eclair.jpg",
          alt: "Éclair au chocolat"
        },
        inStock: false,
        quantity: 1,
        price: 4.99
      }
    ],

    cartProducts: [],
  },
  getters: {
    getProductsInCart: state => {
      return state.cartProducts
    },
    cartTotalAmount: state => {
      let total = 0;
      state.cartProducts.forEach(product => {
        total += ((product.price) * (product.quantity))
      });
      return total.toFixed(2);
    },
    getCartLength: state => {
      return state.cartProducts.length
    },
    getCartItemsQuantity: state => {
      return state.cartProducts.reduce((acc, item) => { 
        return acc + item.quantity;
      }, 0); 
    },
  },
  mutations: {
		ADD_ITEMS_TO_SHOPPING_CART(state, quantity) {
      state.shoppingCart += quantity;
    },

    ADD_PRODUCT_TO_SHOPPING_CART(state, itemToAdd) {
      
      let itemInCart = state.cartProducts.filter(item => item.id === itemToAdd.id);
      let isItemInCart = itemInCart.length > 0;

      if (!isItemInCart) {
        state.cartProducts.push(Vue.util.extend({}, itemToAdd))
        /*let addedItemIndex = state.getCartLength-1;
        addedItemIndex.quantity = itemToAdd.quantity;*/
      } else {
        itemInCart[0].quantity += itemToAdd.quantity;
      }

      itemToAdd.quantity = 1;

    },

    REMOVE_PRODUCT_FROM_SHOPPING_CART(state, index) {
      state.cartProducts.splice(index, 1)
    },

    REMOVE_ALL_PRODUCTS_FROM_SHOPPING_CART(state) {
      state.cartProducts=[]
    }
	},
	actions: {
		updateShoppingCart({ commit }, quantity) {
			commit("ADD_ITEMS_TO_SHOPPING_CART", quantity)
		},

    addProductInShoppingCart({commit}, product, quantity) {
      commit("ADD_PRODUCT_TO_SHOPPING_CART", product, quantity)
    },

    removeProductFromShoppingCart({commit}, index) {
      commit("REMOVE_PRODUCT_FROM_SHOPPING_CART", index)
    },

    removeAllProductsFromShoppingCart({commit}) {
      commit("REMOVE_ALL_PRODUCTS_FROM_SHOPPING_CART")
    }
	},
	modules: {}
})
