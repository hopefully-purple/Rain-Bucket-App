import { ILanguageObject } from "@/interfaces/languageObjectInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorageSaveData = async (data: ILanguageObject): Promise<boolean> => {
  try {
    // console.log("#6(saveData) Given LanguageObj to save:");
    // console.log(JSON.stringify(data, undefined, 2));
    await AsyncStorage.setItem(
      data.language,
      JSON.stringify(data.words)
    );
    // TODO - before returning true, maybe call asyncsotrage.get to double check it exists?
    // console.log("#7(saveData) Data successfully saved");
    return true;
  } catch (e) {
    console.log("(saveData) Failed to save the data to the storage");
    throw e;
  }
}
