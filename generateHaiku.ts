import syllable from 'syllable';
import rwd from 'random-weighted-choice';
import corpus from './corpus.html';

const getCorpus = async (): Promise<string[]> => {
    const text: string = await Promise.resolve(corpus);
    const lowercasedCorpus = text.toLowerCase();
    const splitWords = lowercasedCorpus.split(/ |\n/);
    const strippedWords = splitWords.map((word: string) => word.replace(/[^a-z']/, ""));
    return strippedWords;
}

type WordModel = {[ word: string]: {[ nextWord: string]: number}};

const getWordModel = async (): Promise<WordModel> => {
    const corpus = await getCorpus();

    let wordModel: WordModel = {};

    corpus.forEach((word, idx) => {
        if (idx < corpus.length) {
            const nextWord = corpus[idx + 1];

            if (!wordModel[word]) {
                wordModel[word] = {};
            }

            wordModel[word][nextWord] = (wordModel[word][nextWord] || 0) + 1;
        }
    });

    return wordModel;
}

const getHaiku = async (): Promise<string[]> => {
    const wordModel = await getWordModel();

    // Get 5
    const firstLine = getSingleHaikuLine(wordModel, 5);
    // Get 7
    const secondLine = getSingleHaikuLine(wordModel, 7);
    // Get 5
    const thirdLine = getSingleHaikuLine(wordModel, 5);

    return [firstLine, secondLine, thirdLine].map(line => line.join(' '));
}

const getSingleHaikuLine = (wordModel: WordModel, syllableCount: number): string[] => {
    let nextWord = rwd(Object.keys(wordModel).map(word => ({id: word, weight: 1})));
    let line = [nextWord];

    let syllablesConsumed = syllable(nextWord);

    while (syllablesConsumed < syllableCount) {
        let syllablesLeft = syllableCount - syllablesConsumed;
        const nextWordModel = wordModel[nextWord];

        const nextWordWeights = Object.keys(nextWordModel)
            .filter(word => syllable(word) <= syllablesLeft)
            .map(word => ({id: word, weight: nextWordModel[word]}));

        nextWord = rwd(nextWordWeights);

        const nextWordSyllableCount = syllable(nextWord);

        syllablesConsumed = syllablesConsumed + nextWordSyllableCount;

        line.push(nextWord);
    }

    return line;
}

export {
    getHaiku,
    getSingleHaikuLine
}