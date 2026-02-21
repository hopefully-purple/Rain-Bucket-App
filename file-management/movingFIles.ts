import { File, Paths } from "expo-file-system";
import { jsonToCSV } from "react-native-csv";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

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

export const saveDataToCSV = async (languageObj: any) => {
  // step 1: convert JSON to string using react-native-csv
  // console.log("languageObj to be saved: " + JSON.stringify(languageObj));
  const csv = jsonToCSV(languageObj);
  // console.log("csv content: " + csv);
  // step 2: call createFile with the file name and content
  const file = createFile("RainBucketAppFile2.csv", csv);
  // step 4: upload file?
  // console.log("call saveToMediaLibrary with file uri: " + file.uri);
  // saveToMediaLibrary(file.uri);
  await Sharing.isAvailableAsync().then(isAvailable => {
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
    console.log("file.write() called");
    file.write(content);
    console.log(file.textSync()); // Hello, world!

    return file;
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error after logging it
  }
};

// const saveToMediaLibrary = async (fileUri: string, albumName = 'MyAppFolder') => {
//   // Request permissions
//   console.log("Requesting media library permissions...");
//   const { status } = await MediaLibrary.requestPermissionsAsync();
//   if (status !== 'granted') {
//     console.error('Permission not granted!');
//     return;
//   }

//   try {
//     // Create an asset from the local file URI
//     console.log("Creating asset from file URI");
//     const asset = await MediaLibrary.createAssetAsync(fileUri);
//     // Find or create a specific album (folder)
//     console.log("Checking for album:", albumName);
//     const album = await MediaLibrary.getAlbumAsync(albumName);
//     if (album) {
//       console.log("Album exists, adding asset to album");
//       await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
//     } else {
//       console.log("Album does not exist, creating album and adding asset");
//       await MediaLibrary.createAlbumAsync(albumName, asset, false);
//     }
//     console.log('File saved to Media Library album:', albumName);
//   } catch (error) {
//     console.error('Error saving to media library:', error);
//   }
// };
