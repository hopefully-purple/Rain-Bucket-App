import { ILanguageObject, IWord } from "@/interfaces/languageObjectInterface";
import { sortWords } from "./utility-strings";

export function updateOrAddWordInLanguageObject(
  langaugeObject: ILanguageObject,
  newWord: IWord,
  existingWordId?: string
): ILanguageObject {
  // Create new array from langaugeObject words
  let existingWordList: IWord[] = langaugeObject.words;

  if (existingWordId) {
    // Filter out existing word
    existingWordList = existingWordList.filter((i) => i.id !== existingWordId);
  }

  // Put newWord in array
  existingWordList.push(newWord);

  // Sort
  const sortedWords = sortWords(existingWordList);

  // Replace words array in languageObject
  langaugeObject.words = sortedWords;

  return langaugeObject;
}
