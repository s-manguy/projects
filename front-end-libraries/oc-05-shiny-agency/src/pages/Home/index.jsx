import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { StyledLink } from '../../utils/style/Atoms'
import HomeIllustration from '../../assets/home-illustration.svg'
import { useTheme } from '../../utils/hooks'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomeMain = styled.main`
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  margin: 30px 65px;
  display: flex;
  flex-direction: row;
  max-width: 1310px;
  padding: 139px 77px 179px 98px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  margin-right: 45px;
  ${StyledLink} {
    max-width: 250px;
  }
`

const StyledTitle = styled.h1`
  padding-bottom: 30px;
  max-width: 552px;
  font-size: 50px;
  line-height: 80px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
`

const Illustration = styled.img`
  flex: 1;
`

const Home = () => {
  const { theme } = useTheme()
  return (
    <HomeWrapper>
      <HomeMain theme={theme}>
        <LeftCol>
          <StyledTitle theme={theme}>
            Repérez vos besoins, on s'occupe du reste, avec les meilleurs
            talents
          </StyledTitle>
          <StyledLink to="/survey/1" $isFullLink>
            Faire le test
          </StyledLink>
        </LeftCol>
        <div>
          <Illustration src={HomeIllustration} alt="" />
        </div>
      </HomeMain>
    </HomeWrapper>
  )
}

export default Home
