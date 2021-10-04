import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey/index'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import Header from './components/Header'
import Error from './components/Error'
import Footer from './components/Footer'
import Profile from './pages/Profile'
//import reportWebVitals from './reportWebVitals'
import GlobalStyle from './utils/style/GlobalStyle'
import { SurveyProvider, ThemeProvider } from './utils/context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SurveyProvider>
        <ThemeProvider>
          <GlobalStyle /> {/* Import at the root of the Router! */}
          <Header />
          {/* Header put at the Router root is considered as taking part of the Layout ot the app*/}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/survey/:questionNumber">
              <Survey />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/freelances">
              <Freelances />
            </Route>
            <Route path="/profile/:id">
              <Profile />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </SurveyProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
