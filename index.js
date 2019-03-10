import './main.scss';
import {getHaiku} from './generateHaiku';

const theHaiku = getHaiku();


theHaiku.forEach((line, idx) => {
    const haikuContainer = document.getElementById(`haiku-container-${idx + 1}`);
    haikuContainer.textContent = line;
});
