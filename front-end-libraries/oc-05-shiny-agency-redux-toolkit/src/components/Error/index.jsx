import styled from 'styled-components'
import colors from '../../utils/style/colors'
import IllustrationError from '../../assets/404.svg'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../utils/selectors'

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 65px 30px 65px;
  padding: 99px 219px;
  background-color: ${colors.backgroundLight};
`
const ErrorTitle = styled.h1`
  color: ${colors.textColor};
  font-weight: 700;
  font-size: 31px;
  line-height: 36px;
  text-align: center;
  padding-bottom: 25px;
`
const Illustration = styled.img`
  max-width: 875px;
  max-height: 476px;
  padding-bottom: 88px;
`
const ErrorSubtitle = styled.h2`
  color: ${colors.textColor};
  font-weight: 700;
  font-size: 31px;
  line-height: 36px;
  text-align: center;
  padding-bottom: 88px;
`

const Error = () => {
  const theme = useSelector(selectTheme)
  return (
    <ErrorWrapper theme={theme}>
      <ErrorTitle theme={theme}>Oups...</ErrorTitle>
      <Illustration src={IllustrationError} alt="" />
      <ErrorSubtitle theme={theme}>
        Il semblerait qu'il y ait un problème
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}

export default Error
