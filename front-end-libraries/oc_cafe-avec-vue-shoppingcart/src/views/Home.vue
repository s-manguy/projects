<template>
	<div id="app">
		<h1>{{ restaurantName }}</h1>
		<p class="description">
			Bienvenue dans notre café {{ restaurantName }} ! Nous sommes réputés pour
			notre pain et nos merveilleuses pâtisseries. Faites vous plaisir dès le
			matin ou avec un goûter réconfortant. Mais attention, vous verrez qu'il
			est difficile de s'arrêter.
		</p>

		<section class="menu">
			<h2>Menu</h2>
			
			<div class="menu-item" v-for="item in simpleMenu" :key="item.id">
				<img
					class="menu-item__image"
					:src="item.image.source"
					:alt="item.image.alt"
				/>
				<div>
					<h3>{{ item.name }}</h3>
					<p>Prix : {{ item.price }}

					<p v-if="item.inStock" class="menu-item__stock--in">En stock</p>
					<!-- class added by Sandrine Manguy -->
					<p v-else class="menu-item__stock--out">En rupture de stock</p>
					<!-- class added by Sandrine Manguy -->

					<div v-if="item.inStock">
					<!-- v-if added by Sandrine Manguy to avoid items to be added to 
					the cart when there is no item in stock ! -->
						<label for="add-item-quantity" >
							Quantité :
						</label>
						<input
							v-model.number="item.quantity"
							id="add-item-quantity"
							type="number"
							min="1"
						/> 
						<!-- min attribute added by Sandrine Manguy to prevent -->
						<!-- the user from adding negative numbers! -->
						
						<BaseButton 
							@click="addProductInShoppingCart(item)"
							class="btn btn-add">
							Ajouter au panier
						</BaseButton>
					</div>
				</div>
			</div>
		</section>

		<aside class="shopping-cart">
			<button 
				title="Affiche le panier"
				@click="showModal = true"
				class="btn btn-cart">
				<h2>
					<img src="../assets/panier.png" alt="Panier"/> {{ getCartItemsQuantity }}	
				</h2>
				<p class="right">Total: <strong>{{ cartTotalAmount }} €</strong></p>
			</button>	
		</aside>

		<!-- shopping cart details added by Sandrine MANGUY -->
		<Modal v-if="showModal" @close="showModal = false">
			
			<!-- Modal header -->
			<h3 slot="header">Contenu du panier</h3>


			<!-- Modal body -->

			<!-- case 1 : empty cart -->
			<p v-if="getCartLength === 0" slot="body">Le panier est vide.</p>

			<!-- case 2 : cart containing at least 1 product -->
			<div v-else-if="getCartLength >= 1" slot="body" >
				<div v-for="(cartProduct, index) in cartProducts" :key="cartProduct.id">
					<div class="cart-item">
						<img
							class="cart-item__image"
							:src="cartProduct.image.source"
							:alt="cartProduct.image.alt"
						/>
						<div style="width: 200px;">
							<h4>{{ cartProduct.name }}</h4>
							<p>Prix : {{ cartProduct.price }} €</p>
							<p>
								<label for="update-cartProduct-quantity">
									Qté :
								</label>
								<input
									v-model.number="cartProduct.quantity"
									id="update-cartProduct-quantity"
									type="number"
									min="1"   
								/>
							</p>
							

						</div>
						<BaseButton
							@click="removeProductFromShoppingCart(index)"
							class="btn btn-remove middle">
							Supprimer
						</BaseButton>
					</div>
				</div>

				<div v-if="cartTotalAmount > 0" style="margin-bottom: 1rem; font-weight: bold; font-size: 1rem;">
					Montant total : <span style="font-size: 2rem">{{ cartTotalAmount }} €</span>	
				</div>
				<p v-else slot="body">Le panier est vide.</p>
				
				<BaseButton 
					v-if="cartTotalAmount > 0"
					@click="removeAllProductsFromShoppingCart"
					class="btn btn-remove">
					Vider le Panier
				</BaseButton>
			</div>

			<!-- case 3 : code/display cart error -->
			<p v-else class="error" slot="body">Une erreur est apparue. Veuillez-nous excuser pour ce problème momentané.</p>
		</Modal>

		<Footer />

	</div>
</template>

<script>
import Modal from "../components/Modal"
import BaseButton from "../components/BaseButton"
import Footer from "../components/Footer"
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	name: "Home",
	components: {
		Modal,
		BaseButton,
		Footer,
	},
	data() {
		return {
			showModal: false
		}
	},
	computed: {
		...mapState({
			cartProducts: "cartProducts",
			cartAmount: "cartAmount",
			copyright: "copyright",
			restaurantName: "restaurantName",
			shoppingCart: "shoppingCart",
			simpleMenu: "simpleMenu",
		}),
		...mapGetters({
			getProductsInCart: "getProductsInCart",
			cartTotalAmount: "cartTotalAmount",
			getCartLength: "getCartLength",
			getCartItemsQuantity: "getCartItemsQuantity"
		}),
	},
	methods: {
		...mapActions([
			"addProductInShoppingCart",
			"removeProductFromShoppingCart",
			"removeAllProductsFromShoppingCart",
		])
	}
}
</script>

<style lang="scss">
	.description {
		max-width: 960px;
		font-size: 1.2rem;
		margin: 0 auto;
	}

	.shopping-cart {
		position: absolute;
		right: 30px;
		top: 10px; /* modified by Sandrine Manguy */
	}

	.menu {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

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
			color: #42b983;
			font-weight: bold;
			}

			&--out {
			color: red;
			}
		}
	}

/* below classes have been added by Sandrine Manguy */

	input[type="number"] {
		width: 45px;
	}

	.btn {
		font-size: 1.2rem;
		color: white;
		border: none;
		padding: 0.2rem 0.8rem;
		margin-top: 0.5rem;
		box-shadow: 0.1rem 0.1rem 0.2rem grey;
		
		&-add {
			background-color: #42b983;
			&:hover {
				background-color: darken(#42b983, 10%) 
			}
			&:active {
				background-color: orange; 
			}
		}

		&-remove {
			background-color: red;
			&:hover {
				background-color: lighten(red, 20%) 
			}
			&:active {
				background-color: grey; 
			}
		}

		&-cart {
			background-color: #42b983;
			&:hover {
				background-color: darken(#42b983, 10%) 
			}
		}
	}

	.right {
		text-align:right;
	}

	.center {
		text-align: center;
	}

	.sr-only {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		top: auto;
		overflow: hidden;
	}

	.error {
		color: red;
	}

	.cart-item {
		display: flex;
		width: 400px;
		justify-content: space-between;
		margin-bottom: 30px;
		vertical-align: center;
		align-items: center;

		&__image {
		max-width: 100px;
		height: auto;
		margin-right: 10px;
	}

	.block {
		display: block;
	}
		
	.middle {
		vertical-align: middle;
	}
}
</style>
