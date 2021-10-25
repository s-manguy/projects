import styled from 'styled-components'
import colors from '../../utils/style/colors'
import EmailInput from '../EmailInput'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from '../../utils/selectors'
import * as themeActions from '../../features/theme'

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
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

  return (
    <FooterContainer>
      <EmailInput theme={theme} />
      <NightModeButton
        theme={theme}
        onClick={() => dispatch(themeActions.toggle())}
      >
        Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
      </NightModeButton>
    </FooterContainer>
  )
}

export default Footer
