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

export const asyncStorageGetAllKeys = async (): Promise<string[]> => {
  let keys: any = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    // read key error
    console.log("(getAllKeys) Failed to get all keys from storage: " + e);
    throw e;
  }
}

export const asyncStorageGetDataFromKey = async (key: string): Promise<string> => {
  let result: any;
  try {
    result = await AsyncStorage.getItem(key);
    console.log("(getDataFromKey) Result for key " + key + ": " + result);
    return result != null ? result : "";
  } catch (e) {
    // read key error
    console.log("(getDataFromKey) Failed to get data for key " + key + ": " + e);
    throw e;
  }
}

