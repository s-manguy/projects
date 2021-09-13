//import '../App.css';
import { useState, useEffect } from 'react/cjs/react.development';
import Banner from './Banner';
import Cart from './Cart';
import ShoppingList from './ShoppingList';
import Footer from './Footer.js';
import '../styles/Layout.css'


const App = () => {
  
  // activeCategory & setActiveCategory have been put in this component in order to have the possibility to display an alert each time the category is changed
  const [activeCategory, setActiveCategory] = useState('')
  // keep the cart even if the page is refreshed
  const savedCart = localStorage.getItem('cart')
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <div>
      <Banner />
      <div className='lmj-layout-inner'>
        <Cart 
          cart={cart}
          updateCart={updateCart}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory} />
        <ShoppingList 
          cart={cart}
          updateCart= {updateCart} 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <Footer />
    </div>
  )
}

export default App;
