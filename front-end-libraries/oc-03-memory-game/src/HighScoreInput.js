import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'

class HighScoreInput extends Component {
  constructor(props) {
      super(props);
      this.state = { winner:''}    
  }

  handleWinnerUpdate = (event) => {
      this.setState({ winner: event.target.value.toUpperCase() })
  }

  persistWinner = (event) => {
      event.preventDefault()
      const newEntry = { guesses: this.props.guesses, player: this.state.winner }
      saveHOFEntry(newEntry, this.props.onStored)
  }

  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <p>
          <label>
            Great ! Enter your Nickname :
            <input 
                type="text" 
                autoComplete="given-name" 
                onChange={this.handleWinnerUpdate}
                value={this.state.winner} 
            />
          </label>
          <button type="submit" >I WON !</button>
        </p>
      </form>
    )
  }
}

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  //onStored: PropTypes.func.isRequired,
}

export default HighScoreInput