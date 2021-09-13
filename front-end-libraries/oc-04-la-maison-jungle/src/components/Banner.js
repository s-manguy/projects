import '../styles/Banner.css'
import logo from '../assets/logo.png'


const Banner = () => {
    const title = 'La maison jungle'

    return (
        <header className='lmj-banner'>{/* div replaced by header for accessibility reasons */}
                <img src={logo} alt='La maison jungle' className='lmj-logo' />
                <h1 className='lmj-title'>{title}</h1>
        </header>
    )
}

export default Banner