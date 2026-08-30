import { File, Paths } from "expo-file-system";
import { jsonToCSV, readString } from "react-native-csv";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
// TODO - uninstall @react-native-documents/picker
// return (
//   <Button
//     title="single file import"
//     onPress={async () => {
//       try {
//         const [pickResult] = await pick()
//         // const [pickResult] = await pick({mode:'import'}) // equivalent
//         // do something with the picked file
//       } catch (err: unknown) {
//         // see error handling
//       }
//     }}
//   />
// )
// Big picture steps:
// 3. Then worry about writing multiple files if necessary

// next phase: the reverse
// 3. add the data to the context and storage, assume existing language and overwriting all data.
// 3.1 account for imported language to not already exist
// 3.2 give user the option to choose between overwriting and only adding new words (but if there's an existing word, and the import has additional information, that info will be lost.)
// this should only appear if the language already exists.


export const importDataFromCSV = async () => {
  console.log("Importing data from CSV...");

  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "text/csv",
    });
    if (!result.canceled) {
      // 1. Get the URI of the picked file
      const fileUri = result.assets[0].uri;

      // 2. Initialize the modern Expo File class
      const pickedFile = new File(fileUri);

      // 3. Perform actions (e.g., read file contents as text)
      const fileContent = await pickedFile.text();
      console.log("File Content:", fileContent);

      const fileContentAsJson = readString(fileContent, { header: true });
      console.log("JSON Data:", fileContentAsJson);

      return fileContentAsJson;
    } else {
      // TODO: Notify user
      console.log("Operation cancelled.");
    }
  } catch (error) {
    // TODO: Notify user
    console.error(error);
  }
};

export const saveDataToCSV = async (
  languageData: string,
  languageName: string,
) => {
  // step 1: convert JSON to string using react-native-csv
  // console.log("languageObj to be saved: " + JSON.stringify(languageObj));
  // console.log(languageName + "blahhhhhhh");
  // Specifying fields and data explicitly
  const csv = jsonToCSV({
    fields: ["id", "word", "definition", "pronun", "notes"],
    data: languageData,
  });

  // const csv = jsonToCSV({
  //   fields: ["Column 1", "Column 2"],
  //   data: [
  //     ["foo", "bar"],
  //     ["abc", "def"],
  //   ],
  // });
  // console.log("csv content: ");
  // console.log(csv);

  // step 2: call createFile with the file name and content
  const fileName = languageName + "_vocab.csv";
  const file = createFile(fileName, csv);
  // step 4: upload file?
  await Sharing.isAvailableAsync().then((isAvailable) => {
    if (isAvailable) {
      Sharing.shareAsync(file.uri);
    } else {
      console.log("Sharing is not available");
    }
  });
};

const createFile = (fileName: string, content: string): File => {
  try {
    const file = new File(Paths.cache, fileName);
    console.log("File path:", file.uri);
    if (!file.exists) {
      console.log("file.create() called");
      file.create(); // can throw an error if the file already exists or no permission to create it
    }
    // } else { // Not sure if I should do this
    //   console.log("File already exists, overwriting...");
    //   file.rename(fileName); // overwrite existing file
    // }
    console.log("file.write() called");
    file.write(content);
    // console.log(file.textSync()); // Hello, world!

    return file;
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error after logging it
  }
};
