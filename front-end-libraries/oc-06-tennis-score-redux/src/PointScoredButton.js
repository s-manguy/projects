import { useDispatch } from 'react-redux';
import { pointScored } from './store';

export const PointScoredButton = ({ playerId, children }) => {
    const dispatch = useDispatch();

    return (
        <button 
            className="button"
            onClick= {() => {
                dispatch(pointScored(playerId));
            }}
        >
            {children}
        </button>
    );
}