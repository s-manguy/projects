import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme, selectSurvey, selectAnswers } from '../../utils/selectors'
import { fetchOrUpdateSurvey } from '../../features/survey'
import { saveAnswer } from '../../features/answers'

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
  const theme = useSelector(selectTheme)
  const { questionNumber } = useParams()
  const currentQuestionNumber = parseInt(questionNumber)
  const prevQuestionNumber =
    currentQuestionNumber === 1 ? 1 : currentQuestionNumber - 1
  const nextQuestionNumber = currentQuestionNumber + 1
  const answers = useSelector(selectAnswers)
  const survey = useSelector(selectSurvey)
  const dispatch = useDispatch()

  const saveReply = (answer) => {
    dispatch(saveAnswer({ questionNumber, answer }))
  }

  useEffect(() => {
    dispatch(fetchOrUpdateSurvey)
  }, [dispatch])

  const surveyData = survey.data?.surveyData

  const isLoading = survey.status === 'void' || survey.status === 'pending'

  if (survey.status === 'rejected') {
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
