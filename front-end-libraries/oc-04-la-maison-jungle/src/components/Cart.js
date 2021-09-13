import { useState, useEffect } from "react";
import '../styles/Cart.css'

const Cart = ({ cart, updateCart/*}, activeCategory, setActiveCategory */}) => {
    // activeCategory & setActiveCategory have been put in this component in order to have the possibility to display an alert each time the category is changed
    const [isOpen, setIsOpen] = useState(true)
    const total = cart.reduce(
            (acc, plantType) => acc + plantType.amount * plantType.price,
            0
        )
    useEffect(() => {
        document.title = `LMJ: ${total}€ d'achats`
       //alert(`Montant du panier actualisé : ${total}€`) // this line have been commented because it is not a great UX !
   }, [total/* , activeCategory, setActiveCategory */]) // test : is it possible to write more than one effect in the same use effect ? YES !

    const removeItem = (name) => {
        const cartFilteredCPlantToDelete = cart.filter((plant) => plant.name !== name)
        if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cet article ?')) {
            updateCart([
                ...cartFilteredCPlantToDelete,
            ])
            alert(`L'article ${name} a bien été retiré.`)
        }
       
    }

    const deleteOneUnit = (name, price) => {
        const currentPlantQuantity = cart.find((plant) => plant.name === name) ;// keep the actual plant info
        const cartFilteredCurrentPlant = cart.filter((plant) => plant.name !== name)
        if (currentPlantQuantity.amount > 1) {
            updateCart([
                ...cartFilteredCurrentPlant,
                {name, price, amount: currentPlantQuantity.amount - 1}
            ])
            alert(`1 exemplaire de l'article ${name} a bien été retiré.`)
        } else {
            if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cet article ?')) {
            updateCart([...cartFilteredCurrentPlant])
            alert(`L'article ${name} a bien été retiré.`)
            }
        }  
    }

    const addOneUnit = (name, price) => {
        const currentPlantQuantity = cart.find((plant) => plant.name === name) ;// keep the actual plant info
        const cartFilteredCurrentPlant = cart.filter((plant) => plant.name !== name)
        if (currentPlantQuantity.amount >= 1) {
            updateCart([
                ...cartFilteredCurrentPlant,
                {name, price, amount: currentPlantQuantity.amount + 1}
            ])
            alert(`L'article ${name} a bien été ajouté.`)
        } else {
            console.log("Error: the item is not in the cart")
        }  
    }

    return isOpen ? (
        <aside className='lmj-cart' aria-label="Panier en détails"> {/* div replaced by aside for accessibility reasons */}
            <button 
                className='lmj-cart-toggle-button'
                onClick={() => setIsOpen(false)}
            >
                <span className="material-icons md-48">close</span> {/* Replaced "Fermer" by an icon */}
            </button>
            {cart.length > 0 ? (
               <div>
                    <h2>Panier</h2>
                    <ul>
                        {cart.map(({ name, price, amount }, index) => (
                            <li 
                                key= {`${name}-${index}`}
                                className="lmj-cart-item"
                            >   
                                 {name} {price}€ * {amount} 
                                <div className='lmj-cart-item-button-box'>
                                    <span 
                                        className="material-icons md-light md-36 lmj-cart-item-button lmj-cart-item-button-add" 
                                        title={`Ajouter 1 ${name}`}
                                        onClick= {() => addOneUnit(name, price)}
                                    >
                                        add_circle
                                    </span>
                                    <span 
                                        className="material-icons md-light md-36 lmj-cart-item-button"
                                        title={`Enlever 1 ${name}`}
                                        onClick={() => deleteOneUnit(name, price)}
                                    >
                                        remove_circle
                                    </span> 
                                    <span 
                                        className="material-icons  md-light md-36 lmj-cart-item-button"
                                        title={`Supprimer l'article ${name}`}
                                        onClick={() => removeItem(name, price)}
                                    >
                                        delete_forever
                                    </span> 
                                </div> 
                            </li>
                        ))} 
                    </ul>
                    <h3>Total : {total}€</h3>
                    <button 
                        title="Attention vous allez supprimer tout le panier !"
                        className='lmj-cart-remove-button'
                        onClick={() => {if (window.confirm('Êtes-vous sûr de vouloir vider tout le panier ?')) updateCart([])}}
                    >
                        <span className="material-icons md-36">remove_shopping_cart</span> 
                        {' Vider le panier'} {/* Replaced "Vider le panier" by an icon  */}
                    </button>
               </div> 
            ) : (
                <div>Votre panier est vide</div>
            )}
        </aside>
    ) : (
        <aside className='lmj-cart-closed' aria-label="Panier fermé">
            <button 
                className='lmj-cart-toggle-button'
                onClick={() => setIsOpen(true)}
            >
                 <span className="material-icons size md-36" >shopping_cart</span>
                {' Voir le panier'} {/* Replaced Ouvrir by Voir */}
            </button>
        </aside>
    )
}

export default Cart

