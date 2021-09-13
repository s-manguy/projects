import { plantList } from '../datas/plantList'
import PlantItem from './PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'


const ShoppingList = ({ cart, updateCart, activeCategory, setActiveCategory }) => {
     // activeCategory & setActiveCategory local states have been commented in this component in order to have the possibility to display an alert each time the category is changed
    //const [activeCategory, setActiveCategory] = useState('')
    // Function to obtain a list of the various categories in order to give the possibility to select one of them
    const categories = plantList.reduce(
        (acc, plant) =>
            acc.includes(plant.category) ? acc : acc.concat(plant.category),
        []
    )
    
    // update cart controlling whether the current plant had already been added in the cart.
const addToCart = (name, price) => {
        const currentPlantAdded = cart.find((plant) => plant.name === name)
        if (currentPlantAdded) {
            const cartFilteredCurrentPlant = cart.filter((plant) => plant.name !== name)
            updateCart([
                ...cartFilteredCurrentPlant,
                { name, price, amount: currentPlantAdded.amount + 1 } // modified amount: currentPlantAdded + 1 from the original code which didn't run
            ])
            alert(`L'article ${name} a bien été ajouté.`)
        } else {
            updateCart([...cart, { name, price, amount: 1}])
            alert(`L'article ${name} a bien été ajouté.`)
        }
    }

    return (
        <div className='lmj-shopping-list'>
            <Categories 
                categories={categories}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
            />
            <ul className='lmj-plant-list'>
                {plantList.map(({ id, cover, name, water, light, isBestSale, isSpecialOffer, price, category }) => 
                    !activeCategory || activeCategory === category ? (
                         <li key={id}> {/* replaced div by li for accessibility reasons*/}
                            <PlantItem 
                                cover={cover}
                                name={name}
                                water={water}
                                light={light}
                                isBestSale={isBestSale}
                                isSpecialOffer={isSpecialOffer}
                                price={price}
                            /> {/* added isBestSale & isSpecialOffer to keep the information */}
                            <button 
                                className='lmj-cart-add-button' 
                                title={`Ajouter 1 ${name} au panier`}
                                onClick={() => addToCart(name, price)}
                            >
                                <span className="material-icons md-light md-24">{/*add_*/}shopping_cart</span>{/* Added Google icon */} 
                                {/* Ajouter */}
                            </button>
                        </li>  
                    ) : null
                 )}     
            </ul>
        </div>
    )
}

export default ShoppingList