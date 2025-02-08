import { ILanguageObject } from "@/interfaces/languageObjectInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export function async asyncStorageSaveData(data: ILanguageObject): bool {
export const asyncStorageSaveData = async (data: ILanguageObject): Promise<boolean> => {
//   TODO - Move into a new utilities/storage helper file? Or was there a reason it needed to be here?
  try {
    console.log("#6(saveData) Current LanguageObj to save:");
    console.log(JSON.stringify(data, undefined, 2));
    // !!!!! Bug. LanguageObj is out of date
    await AsyncStorage.setItem(
      data.language,
      JSON.stringify(data.words)
    );
    // TODO - before returning true, maybe call asyncsotrage.get to double check it exists?
    console.log("#7(saveData) Data successfully saved");
    return true;
  } catch (e) {
    console.log("(saveData) Failed to save the data to the storage");
    throw e;
  }
}
