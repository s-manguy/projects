<script>
import { mapActions } from 'vuex'
import BaseButton from "./BaseButton.vue"

export default {
    name: 'MenuItem',
    components: {
        BaseButton
    },
    props: {
        name: {
            type : String,
            required: true
        }, 
        image: {
            type: Object,
            required: true
        }, 
        price: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            onSale: false
        }
    },
    computed: {
        generatedPrice() {
            if (this.onSale) {
                return (this.price*0.9).toFixed(2)
            } else {
                return this.price
            }
        }
   },
	methods: {
		...mapActions(["updateShoppingCart"])
	},
	beforeMount() {
		const today = new Date().getDate()
		if (today % 2 === 0) {
			this.onSale = true
		}
	}
}
</script>

<template>
<div class="menu-item">
    <img
        class="menu-item__image"
        :src="image.source"
         :alt="image.alt"
    />
    <div>
        <h3>{{ name }}</h3>
        <p>Prix : {{generatedPrice}}
        <p v-if="inStock" class="menu-item__stock--in">En stock</p>
        <!-- class added by Sandrine Manguy -->
        <p v-else class="menu-item__stock--out">En rupture de stock</p>
        
        <div v-if="inStock">
        <!-- v-if added by Sandrine Manguy to avoid items to be added to 
        the cart when there is no item in stock ! -->
            <label for="add-item-quantity" class="block">
                Quantité : {{ quantity }}
            </label>
            <input
                v-model.number="quantity"
                id="add-item-quantity"
                type="number"
                min="1" 
                class="block"   
            />
            <!-- min attribute added by Sandrine Manguy to prevent the user from adding negative numbers! -->
            <BaseButton 
                @click="updateShoppingCart(quantity)"
                class="block button">
                Ajouter au panier d'achat
            </BaseButton>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.menu-item {
  display: flex;
  width: 500px;
  justify-content: space-between;
  margin-bottom: 30px;

  &__image {
  max-width: 300px;
  }

  /* menu-item__stock--in and menu-item__stock--out classes added by Sandrine Manguy */
  &__stock {
    &--in {
    color: green;
    font-weight: bold;
    }

    &--out {
    color: red;
    }
  }

/* .block and .button classes added by Sandrine Manguy */
  .block {
    display: block;
  }

  .button {
    margin-top: 0.5rem;
  }
}
</style>