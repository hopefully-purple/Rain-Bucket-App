import { File, Paths } from "expo-file-system";
import { jsonToCSV, readString } from "react-native-csv";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { ILanguageObject, IWord } from "@/interfaces/languageObjectInterface";
import { asyncStorageGetAllKeys, asyncStorageSaveData } from "./utility-async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Imports data from a CSV file and saves it to AsyncStorage
 * If languageKey is "NEW_LANGUAGE", the file name (without .csv) will be used as the new language key
 * Otherwise, the provided languageKey will be used to save the data
 * 
 * @param languageKey async storage key for language to import
 * @returns true if the data was imported and saved successfully, false otherwise
 */
export const importDataFromCSV = async (languageKey: string): Promise<boolean> => {
  console.log("Importing data from CSV... = ", languageKey);

  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "text/csv",
    });
    if (!result.canceled) {
      // 1. Get the URI of the picked file
      const fileUri = result.assets[0].uri;
      const fileName = result.assets[0].name;

      // 2. Initialize the modern Expo File class
      const pickedFile = new File(fileUri);
      
      // 3. Perform actions (e.g., read file contents as text)
      const fileContent = await pickedFile.text();
      console.log("File Content:", fileContent);

      const fileContentAsJson = readString(fileContent, { header: true });
      console.log("JSON Data:", fileContentAsJson);

      // TO DO: make use of fileContentAsJson.errors https://react-native-csv.js.org/docs#errors

      const languageName = languageKey === "NEW_LANGUAGE" ? fileName.replace(".csv", "") : languageKey;
      console.log("Proceeding to save data to AsyncStorage for language: ", languageName);

      const saveResult = await saveCSVJSONToAsyncStorage(
        fileContentAsJson.data,
        fileContentAsJson.meta,
        languageName,
      );

      // TODO: If saveResult, notify user of success!
      if (saveResult) {
        console.log("NOTIFY USER OF SUCCESS");
        return true;
      }
    } else {
      // TODO: Notify user
      console.log("Operation cancelled.");
      return false;
    }
  } catch (error) {
    // TODO: Notify user
    console.error(error);
  }
  return Promise.resolve(false);
};

/**
 * Helper for importDataFromCSV
 * Saves the parsed CSV JSON data to AsyncStorage under the specified language key.
 * 
 * @param csvJson array of data converted from CSV to JSON
 * @param parseResultMeta metadata from file parsing object
 * @param languageKey async storage key for language to save
 * @returns true if the data was saved successfully, false otherwise
 */
const saveCSVJSONToAsyncStorage = async (
  csvJson: any[],
  parseResultMeta: any,
  languageKey: string,
): Promise<boolean> => {
  console.log("Saving CSV JSON to AsyncStorage...");
  
  console.log(parseResultMeta); // TO Do: evaluate if having the "meta" data is necessary in this function

  let newWordsList: IWord[] = [];
  csvJson.forEach((row: any) => {
    console.log(`Processing row: ${JSON.stringify(row)}`);
    newWordsList.push(row);
  });

  const newLanguageObject: ILanguageObject = {
    language: languageKey,
    words: newWordsList,
  };

  console.log("New Language Object to be saved:", newLanguageObject);
  return asyncStorageSaveData(newLanguageObject);
};

export const exportAllDataToCSV = async () => {
  console.log("Exporting all data to CSV...");
  try {
    const allKeys = await asyncStorageGetAllKeys();
    console.log("All keys retrieved:", allKeys);

    for (const key of allKeys) {
      const languageDataString = await AsyncStorage.getItem(key);
      if (languageDataString) {
        const languageData = JSON.parse(languageDataString);
        console.log(`(exportAllDataToCSV) Exporting data for key: ${key}`, languageData);
        await saveDataToCSV(languageData, key);
      } else {
        console.warn(`No data found for key: ${key}`);
      }
    }

    // TODO: Notify user of success after all exports are complete
  } catch (error) {
    console.error("Error exporting data to CSV:", error);
  }

};

export const saveDataToCSV = async (
  languageData: string,
  languageName: string,
) => {
  // step 1: convert JSON to string using react-native-csv

  // Specifying fields and data explicitly
  const csv = jsonToCSV({
    fields: ["id", "word", "definition", "pronun", "notes"],
    data: languageData,
  });

  // step 2: call createFile with the file name and content
  const fileName = languageName + "_vocab.csv";
  const file = createFile(fileName, csv);
  // step 4: upload file?
  console.log("(saveDataToCSV) awaiting Sharing.isAvailableAsync()...");
  await Sharing.isAvailableAsync().then(async (isAvailable) => {
    if (isAvailable) {
      await Sharing.shareAsync(file.uri);
    } else {
      console.log("(saveDataToCSV) Sharing is not available");
    }
  });
};

const createFile = (fileName: string, content: string): File => {
  try {
    const file = new File(Paths.cache, fileName);
    console.log("(createFile) File path:", file.uri);
    if (!file.exists) {
      console.log("(createFile) file.create() called");
      file.create(); // can throw an error if the file already exists or no permission to create it
    }

    console.log("(createFile) file.write() called");
    file.write(content);

    return file;
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error after logging it
  }
};
