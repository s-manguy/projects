import styled, { keyframes } from 'styled-components'
import colors from './colors'
import { Link } from 'react-router-dom'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
  transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

export const StyledLink = styled(Link)`
  padding: 10px 25px;
  color: ${({ $theme }) =>
    $theme === 'light' ? colors.secondary : colors.light};
  text-decoration: none;
  font-family: 'Comfortaa';
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  ${(props) =>
    props.$isFullLink &&
    `color: ${colors.light}; 
  border-radius: 30px; 
  background-color: ${colors.primary};`}
`
