import './main.scss';
import {getHaiku} from './generateHaiku';

getHaiku().then(theHaiku => {
    theHaiku.forEach((line, idx) => {
        const haikuContainer = document.getElementById(`haiku-container-${idx + 1}`);
        haikuContainer.textContent = line;
    });    
});

