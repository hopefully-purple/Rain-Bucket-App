import { ILanguageObject, IWord } from "@/interfaces/languageObjectInterface";
import { sortWords } from "./utility-strings";

// export function addWordToLanguageObject = (langaugeObject: ILanguageObject, newWord: IWord) => {
export function addWordToLanguageObject(langaugeObject: ILanguageObject, newWord: IWord) {
    // TODO - will this turn out to be too similar to update? Should the methods be combined?
}

export function updateWordInLanguageObject(langaugeObject: ILanguageObject, newWord: IWord, existingWordId: string): ILanguageObject {
    // Filter out existing word
    const wordsExcludingExistingWord: IWord[] = langaugeObject.words.filter((i) => i.id !== existingWordId);

    // Put newWord in array
    wordsExcludingExistingWord.push(newWord);

    // Sort
    const sortedWords = sortWords(wordsExcludingExistingWord);

    // Replace words array in languageObject
    langaugeObject.words = sortedWords;

    return langaugeObject;
}



// export const updateContext = (newI: IWord):  => {
//     console.log("#4(updateContext) find the object");
//     // Filter condition (remove old item from array)
//     function excludeItem(i: IWord) {
//       // TODO - turn this into arrow func
//       return i.id !== selectedItem.id;
//     }
//     const filteredWords: IWord[] = languageObj.words.filter(excludeItem);
//     //console.log(JSON.stringify(word, undefined, 2));
//     // Put newI in array
//     filteredWords.push(newI);
//     const sortedNL: IWord[] = filteredWords.sort((a, b) =>
//       a.word > b.word ? 1 : -1
//     );
//     console.log("#5(updateContext) Set langObject to SortedNL:");
//     console.log(JSON.stringify(sortedNL, undefined, 2));
//     // ROOT OF Save BUG !!!!!!!! langaugeObject is not properly updated here...
//     const newLangObj = { ...languageObj, words: sortedNL } as ILanguageObject;
//     console.log("#5.1(updateContext) newLangObjL");
//     console.log(JSON.stringify(newLangObj, undefined, 2));

//     setLanguageObj(newLangObj);
//     console.log(
//       "#6 !!! PLACE OF BUG (updateContext) is new lang updated? "
//     ); // NOPE
//     console.log(JSON.stringify(languageObj, undefined, 2));
//     console.log("#7(updateContext) setSelectedItem to newI");
//     // setSelectedItem(newI); //Maybe
//   };