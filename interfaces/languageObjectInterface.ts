export interface ILanguageObject {
  language: string;
  words: IWord[];
}

export interface IWord {
  id: string;
  word: string;
  definition: string;
  pronun?: string;
}
