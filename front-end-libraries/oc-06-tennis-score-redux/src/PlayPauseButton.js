import { useStore } from 'react-redux'
// import { playPauseAction, pointScored } from './actions'
import { autoplay } from './store';

export const PlayPauseButton = () => {
    const store = useStore();

    return (
        <button 
            className="button"
            onClick={() => {
                autoplay(store);
            }}
        >
            Pause / Reprendre
        </button>
    );
    
}