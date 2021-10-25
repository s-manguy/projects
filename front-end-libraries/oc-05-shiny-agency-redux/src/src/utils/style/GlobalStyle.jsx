import { useSelector } from 'react-redux'
import { selectTheme } from '../selectors'
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
  const theme = useSelector(selectTheme)
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
