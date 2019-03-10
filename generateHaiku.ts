import syllable from 'syllable';
import randomWords from 'random-words';

const getHaiku = (): string[] => {
    // Get 5
    const firstLine = getSingleHaikuLine(5);
    // Get 7
    const secondLine = getSingleHaikuLine(7);
    // Get 5
    const thirdLine = getSingleHaikuLine(5);

    return [firstLine, secondLine, thirdLine].map(line => line.join(' '));
}

const getSingleHaikuLine = (syllableCount: number): string[] => {
    let syllablesConsumed = 0;
    let line = [];

    while (syllablesConsumed < syllableCount) {
        let syllablesLeft = syllableCount - syllablesConsumed;
        const nextWord: string = randomWords();

        const syllableCountOfNextWord: number = syllable(nextWord);
        if (syllableCountOfNextWord <= syllablesLeft) {
            syllablesConsumed = syllablesConsumed + syllableCountOfNextWord;
            line.push(nextWord);
        }
    }

    return line;
}

export {
    getHaiku,
    getSingleHaikuLine
}