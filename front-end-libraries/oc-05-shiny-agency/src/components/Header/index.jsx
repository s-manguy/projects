import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import DarkLogo from '../../assets/dark-logo.png'
import LightLogo from '../../assets/light-logo.png'
import { useTheme } from '../../utils/hooks'

const NavBar = styled.nav`
  padding: 30px 62px 65px 33px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
`
const HomeLogo = styled.img`
  height: 70px;
  width: auto;
`

const Header = () => {
  const { theme } = useTheme()

  return (
    <NavBar>
      <Link to="/">
        <HomeLogo alt="" src={theme === 'light' ? DarkLogo : LightLogo} />
      </Link>
      <div>
        <StyledLink $theme={theme} to="/">
          Accueil
        </StyledLink>
        <StyledLink $theme={theme} to="/freelances">
          Profils
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
      </div>
    </NavBar>
  )
}

export default Header
