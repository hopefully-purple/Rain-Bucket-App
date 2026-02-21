
// Big picture steps:
// 1. Don't worry about which language, just get the data for one language and write it to a file
// 2. Then worry about sharing the file
// 3. Then worry about which language, and writing multiple files if necessary
// 4. then let the user decide the file paths

// next phase: the reverse
// 1. open a file management modal that will let the user select a file
// 2. read the file and convert it back to json
// 3. add the data to the context and storage, making sure not to overwrite existing data (maybe add a "date added" field to each word, and only overwrite if the new word is newer than the existing word? or just add all new words and let the user delete duplicates later?)

// user flow plan:
// from "save" button on settings page, open a file management modal (like word details) that will give buttons as options
// it will say "All", then for each language, a button for that one specifically.

export const saveDataToCSV = (data: string) => {
  // step 1: convert json to string
  const dataAsString = JSON.stringify(data);
  // step 2: write string to file
  const fileName = "myData.csv"; // TODO - make this dynamic based on language and date
  writeCSVFile(fileName, dataAsString);
  // step 3: file upload?
};

export const writeCSVFile = (fileName: string, data: string) => {
  var RNFS = require("react-native-fs");
  // create a path you want to write to
  // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
  // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
  var path = RNFS.DocumentDirectoryPath + "/" + fileName;

  // write the file
  RNFS.writeFile(path, data, "utf8")
    .then((success: any) => {
      console.log("FILE WRITTEN!");
    })
    .catch((err: any) => {
      console.log(err.message);
      throw err;
    });
};
