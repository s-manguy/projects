import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTheme } from '../../utils/selectors'
import { useQuery } from 'react-query'

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
`

const Pagesubtitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
  text-align: center;
  padding-bottom: 70px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardsContainer = styled.div`
  display: grid;
  grid-column-gap: 70px;
  grid-row-gap: 52px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const Freelances = () => {
  const theme = useSelector(selectTheme)

  const { data, isLoading, error } = useQuery('freelances', async () => {
    const response = await fetch('http://localhost:8000/freelances')
    const data = await response.json()
    return data
  })

  if (error) {
    return <span>Oups... Il y a eu un problème.</span>
  }

  return (
    <MainWrapper theme={theme}>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <Pagesubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </Pagesubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer theme={theme}>
          {data.freelancersList.map((profile, index) => (
            <Link key={`freelance-${profile.id}`} to={`/profile/${profile.id}`}>
              <Card
                key={`${profile.name}-${index}`}
                label={profile.job}
                picture={profile.picture}
                title={profile.name}
                theme={theme}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </MainWrapper>
  )
}

export default Freelances
