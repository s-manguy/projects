import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { ThemeContext } from '../../utils/context'
import { useContext } from 'react'
import EmailInput from '../EmailInput'

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 30px;
`

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
  color: ${({ theme }) => (theme === 'light' ? 'black' : colors.light)};
  margin-left: 40px;
`

const Footer = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)

  return (
    <FooterContainer>
      <EmailInput theme={theme} />
      <NightModeButton theme={theme} onClick={() => toggleTheme()}>
        Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
      </NightModeButton>
    </FooterContainer>
  )
}

export default Footer
