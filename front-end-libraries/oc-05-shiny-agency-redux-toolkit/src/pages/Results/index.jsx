import { useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { StyledLink, Loader } from '../../utils/style/Atoms'
import EmptyList from '../../components/EmptyList'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectTheme,
  selectResults,
  selectAnswers,
} from '../../utils/selectors'
import { fetchOrUpdateResults } from '../../features/results'

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 65px;
  padding: 113px 423px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
  font-weight: 700;
  font-size: 31px;
  line-height: 35px;
  max-width: 45%;
  text-align: center;
  padding-bottom: 60px;

  & > span {
    padding-left: 10px;
    color: ${({ theme }) =>
      theme === 'light' ? colors.primary : colors.light};
  }
  & > span:first-of-type {
    padding-left: 0px;
  }
`

const DescriptionWrapper = styled.div`
  padding: 60px;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;

  }
`
const JobTitle = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : colors.light)};
`

const JobDescription = styled.div`
& > span {
  color: ${({ theme }) => (theme === 'light' ? colors.primary : colors.light)};
  text-transform: Capitalize;
}
  & > p {
    margin-block-start: 5px;
    padding-bottom: 15px; 
    color: ${({ theme }) =>
      theme === 'light' ? colors.secondary : colors.light};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export function formatQueryParams(answers) {
  const answerNumbers = Object.keys(answers)

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParam = index === 0
    const separator = isFirstParam ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

// function added for testing
export function formatJobList(title, listLength, index) {
  if (index === listLength - 1) {
    return title
  }
  return `${title},`
}

const Results = () => {
  const theme = useSelector(selectTheme)
  const answers = useSelector(selectAnswers)
  const queryParams = formatQueryParams(answers)
  const results = useSelector(selectResults)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrUpdateResults(queryParams))
  }, [dispatch, queryParams])

  if (results.status === 'rejected') {
    return <span>Il y a un problème</span>
  }

  const resultsData = results.data?.resultsData

  const isLoading =
    results.status === 'void' ||
    results.status === 'pending' ||
    results.status === 'updating'

  if (resultsData?.length < 1) {
    return <EmptyList theme={theme} />
  }

  return isLoading ? (
    <LoaderWrapper>
      <Loader theme={theme} data-testid="loader" />
    </LoaderWrapper>
  ) : (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        Les compétences dont vous avez besoin : {<br />}
        {resultsData &&
          resultsData.map((result, index) => (
            <JobTitle
              key={`result-title-${index}-${result.title}`}
              theme={theme}
            >
              {formatJobList(result.title, resultsData.length, index)}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink $isFullLink to="/freelances">
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result, index) => (
            <JobDescription
              theme={theme}
              key={`result-detail-${index}-${result.title}`}
            >
              <span data-testid="job-title">{result.title}</span>
              <p data-testid="job-description">{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
    </ResultsContainer>
  )
}

export default Results
