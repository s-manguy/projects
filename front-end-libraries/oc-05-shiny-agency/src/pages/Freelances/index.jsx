// import DefaultPicture from '../../assets/profile.png'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
//import { useEffect, useState } from 'react'
import { useFetch, useTheme } from '../../utils/hooks'
import { Link } from 'react-router-dom'

// const freelanceProfiles = [
//   {
//     name: 'Jane Doe',
//     jobTitle: 'Devops',
//     picture: DefaultPicture,
//   },
//   {
//     name: 'John Doe',
//     jobTitle: 'Developpeur frontend',
//     picture: DefaultPicture,
//   },
//   {
//     name: 'Jeanne Biche',
//     jobTitle: 'Développeuse Fullstack',
//     picture: DefaultPicture,
//   },
// ]

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
  grid-templat-rows: 340px 340px;
  align-items: center;
  justify-items: center;
`

const Freelances = () => {
  const { theme } = useTheme()
  // const [isDataLoading, setDataLoading] = useState(false)
  // const [error, setError] = useState(false)
  // const [freelancersList, setFreeLancersList] = useState([])
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelances`
  )
  const freelancersList = data?.freelancersList

  // useEffect(() => {
  //   async function fetchFreelances() {
  //     setDataLoading(true)
  //     try {
  //       const response = await fetch(`http://localhost:8000/freelances`)
  //       const { freelancersList } = await response.json()
  //       setFreeLancersList(freelancersList)
  //     } catch (err) {
  //       console.log('error: ', err)
  //       setError(true)
  //     } finally {
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchFreelances()
  // }, [])

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
          {freelancersList?.map((profile, index) => (
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
