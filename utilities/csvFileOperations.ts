import { File, Paths } from "expo-file-system";
import { jsonToCSV } from "react-native-csv";
import * as Sharing from "expo-sharing";
import { pick } from '@react-native-documents/picker'
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
// 1. open a file management modal that will let the user select a file
// 2. read the file and convert it back to json
// 3. add the data to the context and storage, making sure not to overwrite existing data (maybe add a "date added" field to each word, and only overwrite if the new word is newer than the existing word? or just add all new words and let the user delete duplicates later?)

export const importDataFromCSV = async () => {
  const [pickResult] = await pick();
  console.log(pickResult.name);
};




export const saveDataToCSV = async (languageData: string, languageName: string) => {
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
