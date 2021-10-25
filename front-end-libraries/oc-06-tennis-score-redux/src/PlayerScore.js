import { useSelector } from "react-redux";
import { 
    selectPlayerHasAdvantage, 
    selectPlayerScore,
    selectPointsBeforeWin,
 } from "./selectors";


export const PlayerScore = ({ playerId, playerName }) => {
    const score = useSelector(selectPlayerScore(playerId));
    const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId));
    const pointsBeforeWin = useSelector(selectPointsBeforeWin(playerId));

    return (
        <div className="player-score">
            <p>
                {playerName}
                {pointsBeforeWin === null
                    ? ""
                    : ` (encore ${pointsBeforeWin} ${
                        pointsBeforeWin >1 ? "points" : "point"
                    })`    
                }
            </p>
            <p>{(hasAdvantage ? "Avantage - " : "") + score}</p>
        </div>
    );
}