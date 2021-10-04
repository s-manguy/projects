import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useTheme } from '../../utils/hooks'
//import { useState } from 'react'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 35px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 340px;
  height: 340px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
`

const CardLabel = styled.div`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : colors.light)};
  font-size: 22px;
  font-weight: 400;
  padding-left: 25px;
`

const CardImage = styled.img`
  height: 148px;
  width: 148px;
  border-radius: 50%;
  align-self: center;
`
const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
  font-size: 25px;
  font-weight: 400;
  line-height: 29px;
  text-align: center;
`

const Card = ({ label, picture, title }) => {
  const { theme } = useTheme()
  // const [isFavorite, setIsFavorite] = useState(false)
  // const star = isFavorite ? '⭐️' : ''

  return (
    <CardWrapper theme={theme}>
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardImage src={picture} alt="freelance" />
      <CardTitle theme={theme}>
        {/*star*/} {title} {/*star*/}
      </CardTitle>
    </CardWrapper>
  )
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: '',
  picture: '',
  title: 'Mon titre par défaut',
}

export default Card
