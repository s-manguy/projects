import { useTheme } from '../hooks'
import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        display: flex;
        justify-content: center;
        margin: 0;
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? colors.dark : colors.light};
    }
`

const GlobalStyle = () => {
  const { theme } = useTheme()
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
