import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 38px;
`

const QuestionTitle = styled.h2`
  font-weight: 700;
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px auto 63px auto;
  font-weight: 400;
  font-size: 20px
  line-height: 23px;
  text-align: center;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
  font-weight: 700;
  font-size: 25px;
  line-height: 29px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 20px;
  }
  &:last-of-type {
    margin-left: 20px;
  }
`

const LinkWrapper = styled.div`
  padding-top: 63px;
  display: flex;
  justify-content: center;
  & a {
    color: ${({ theme }) => (theme === 'light' ? colors.dark : colors.light)};
    display: inline-block;
    width: 100px;
    font-weight: 400;
    font-size: 18px;
    line height: 21px;
  }
  & a:first-of-type {
    margin-right: 20px;
    text-align: right;
  }
  & a:last-of-type {
    margin-left: 20px;
    text-align: left;
  }
`

const Survey = () => {
  const { theme } = useTheme()
  const { questionNumber } = useParams()
  const currentQuestionNumber = parseInt(questionNumber)
  const prevQuestionNumber =
    currentQuestionNumber === 1 ? 1 : currentQuestionNumber - 1
  const nextQuestionNumber = currentQuestionNumber + 1
  //const [surveyData, setSurveyData] = useState({})
  // const [isDataLoading, setDataLoading] = useState(false)
  const { answers, saveAnswers } = useContext(SurveyContext)
  //const [error, setError] = useState(false)
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data

  // useEffect(() => {
  //   setDataLoading(true)
  //   fetch(`http://localhost:8000/survey`)
  //     .then((response) => response.json())
  //     .then(({ surveyData }) => {
  //       setSurveyData(surveyData)
  //       setDataLoading(false)
  //     })
  //  }, [])

  const saveReply = (answer) => {
    saveAnswers({ [questionNumber]: answer })
  }

  // NO MORE USE DUE TO useFetch()
  //  useEffect(() => {
  //   async function fetchSurvey() {
  //     setDataLoading(true)
  //     try {
  //       const response = await fetch(`http://localhost:8000/survey`)
  //       const { surveyData } = await response.json()
  //       setSurveyData(surveyData)
  //     } catch (err) {
  //       console.log(err)
  //       setError(true)
  //     } finally {
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchSurvey()
  // }, [])

  if (error) {
    return <span>Oups... Il y a eu un problème.</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader theme={theme} />
      ) : (
        <QuestionContent theme={theme}>
          {surveyData[questionNumber]}
        </QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link theme={theme} to={`/survey/${prevQuestionNumber}`}>
          Précédente
        </Link>
        {surveyData && surveyData[currentQuestionNumber + 1] ? (
          <Link theme={theme} to={`/survey/${nextQuestionNumber}`}>
            Suivante
          </Link>
        ) : (
          <Link theme={theme} to="/results">
            Résultats
          </Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey
