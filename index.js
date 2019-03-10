import {getHaiku} from './generateHaiku';

const theHaiku = getHaiku();

const haikuContainer = document.getElementById('haiku-container');

haikuContainer.textContent = theHaiku;