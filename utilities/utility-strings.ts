// Packages to consider in place of doing by hand:
// https://npm.io/package/rn-alphabet-section-list

import { SPANISH } from "@/assets/alphabets/Alphabets";
import { ILanguageObject, IWord } from "@/interfaces/languageObjectInterface";
import {
  ISection,
  ISectionListData,
  SectionItem,
} from "@/interfaces/sectionListInterface";

/**
 * TODO - should this be more generic?
 * @param array array of IWord objects
 * @returns new sorted array
 */
export function sortWords(array: IWord[]) {
  return array.sort((a, b) => a.word > b.word ? 1 : -1);
}

export function organizeIntoAlphabetizedSections(langObj: ILanguageObject) {
  //Section gameplan:
  if (langObj.language !== "Spanish") {
    const newS = [
      {
        title: "Words",
        data: langObj.words,
      },
    ];
    // console.log("(organize) Not Spanish. Return newS=");
    // console.log(JSON.stringify(newS, undefined, 2));
    return newS as ISectionListData;
  }
  // List of alphabet characters (oo including spanish characters??)
  // for each letter, do the filter charAt
  let newSL: ISectionListData = [];
  for (let letter of SPANISH) {
    let section = langObj.words.filter(
      (i) =>
        i.word.charAt(0).toUpperCase() === letter ||
        (i.word.charAt(0) === "¡" &&
          i.word.charAt(1).toUpperCase() === letter) ||
        (i.word.charAt(0) === "¿" && i.word.charAt(1).toUpperCase() === letter)
    );
    if (section.length > 0) {
      // create a new section object with title = letter and data = list
      const newS: ISection = {
        title: letter,
        data: section as SectionItem[],
      };
      // add section object to section array
      newSL.push(newS);
    }
  }
  // console.log("(organize) resulting newSL:");
  // console.log(JSON.stringify(newSL, undefined, 2));
  // pass section array to SectionList component
  return newSL;
}
