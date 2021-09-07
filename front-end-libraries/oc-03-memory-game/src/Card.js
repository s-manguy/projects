import React from 'react'

import './Card.css'
import Proptypes from 'prop-types'

const HIDDEN_SYMBOL = '❓'

// card: symbol to display
// feedback: card visual state (hidden or visible)
const Card = ({card, feedback, index, onClick}) => (
    <div className={`card ${feedback}`} onClick={() => onClick(index)}>
        <span className="symbol">
            {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
        </span>
    </div>
)

Card.propTypes = {
    card: Proptypes.string.isRequired,
    feedback: Proptypes.oneOf([
        'hidden',
        'justMatched',
        'justMismatched',
        'visible',
    ]).isRequired,
    index: Proptypes.number.isRequired,
    onClick: Proptypes.func.isRequired,
}

export default Card