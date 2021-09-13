import { useState } from 'react'
import '../styles/Footer.css'


const Footer = () => {
	const [inputValue, setInputValue] = useState('')

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleBlur = () => {
        if (!inputValue.includes('@')) {
            alert("Attention, il n'y a pas d'@, ceci n'est pas une adresse valide 😥.")
        }
    }

	return (
		<footer className='lmj-footer'>
			<div className='lmj-footer-elem'>
				Pour les passionné·e·s de plantes {/*🌿🌱🌵*/}
			</div>
            <label htmlFor='email' className='lmj-footer-elem'>
                Laissez-nous votre adresse mail : 
                {/* changed from div (from the original code) to label for accessibility reasons */} 
            </label>
            <input 
                    className="lmj-footer-elem-input"
                    type='email'
                    id='email'
                    placeholder='Entrez votre adresse mail'
                    size='30'
                    required
                    onChange={handleInput}
                    value={inputValue}
                    onBlur={handleBlur}
            />  {/* added type id placeholder size required attributes for accessibility reasons */} 

		</footer>
	)
}

export default Footer
