import React, { useState, useContext } from "react";
import { Text, StyleSheet, Alert, View } from "react-native";
import { Button } from "react-native-paper";
import LanguageObjectContext from "@/contexts/LanguageObject";
import Colors from "@/assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { IWord } from "@/interfaces/languageObjectInterface";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/assets/styles/styleSheet";
import ManageFileModal from "@/components/ManageFileModal";
import { asyncStorageGetAllKeys } from "@/utilities/utility-async-storage";
import { importDataFromCSV } from "@/utilities/csvFileOperations";

// to do: messagemap

export default function SettingsScreen() {
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const [output, setOutput] = useState("");
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);

  const clearAllData = async () => {
    let didUserConfirm = false;
    Alert.alert("CLEAR ALL DATA", "ARE YOU SURE?", [
      {
        text: "Cancel",
        onPress: () => (didUserConfirm = false),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => (didUserConfirm = true),
        style: "destructive",
      },
    ]);
    if (didUserConfirm) {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        // clear error
        console.log("clear storage threw error " + e);
        throw e;
      }

      // console.log('Done.');
    }
  };

  const getCurrentLData = async () => {
    // console.log(languageObj.language);
    try {
      const result = await AsyncStorage.getItem(languageObj.language);
      let itemCount = result != null ? JSON.parse(result).length : "";
      setOutput("ITEMCOUNT=" + itemCount + "\n" + result);
    } catch (e) {
      // clear error
      console.log("getCurrentData storage threw error " + e);
      throw e;
    }
  };

  // TODO: remove and use the utility function instead
  const getAllKeys = async () => {
    const keys = await asyncStorageGetAllKeys();
    setOutput(keys[0] + ", " + keys[1]);
    // return keys;
    // console.log(JSON.stringify(keys));
    // return [];
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  const deleteCertainData = async () => {
    console.log("Delete English language object");

    try {
      await AsyncStorage.removeItem("English");
    } catch (e) {
      console.log("deleteCertainData storage threw error " + e);
      throw e;
    }
  };
  
  const deleteCertainDataInLanguage = async () => {
    console.log(
      "Deleting words from context and storage that are missing an id",
    );
    // Filter condition
    function excludeItems(i: IWord) {
      return i.id !== undefined;
    }
    const words = languageObj.words.filter(excludeItems);
    // console.log(words);
    setLanguageObj({ ...languageObj, words: words });
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(languageObj.language, JSON.stringify(words));
        // console.log('(saveData) Data successfully saved');
      } catch (e) {
        console.log("(saveData) Failed to save the data to the storage");
        throw e;
      }
    };

    saveData();
  };

  // console.log('Settings screen');
  return (
    <SafeAreaView
      style={styles.screenContainer}
      edges={["right", "bottom", "left"]}
    >
      <View>
        <Text style={localStyles.text}>Local File Operations:</Text>
        <Button
          style={localStyles.button}
          mode="outlined"
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={() => setExportModalVisible(true)}
        >
          Export Data
        </Button>
        <Button
          style={localStyles.button}
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          mode="outlined"
          onPress={() => setImportModalVisible(true)}
        >
          Import Data
        </Button>
      </View>
      <View>
        <Text style={localStyles.text}>Async Storage Operations:</Text>
        <Button
          mode="outlined"
          style={localStyles.button}
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={() => clearAllData()}
        >
          CLEAR STORAGE
        </Button>
        <Button
          style={localStyles.button}
          mode="outlined"
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={() => getAllKeys()}
        >
          GET ALL KEYS STORAGE
        </Button>
        <Button
          mode="outlined"
          style={localStyles.button}
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={() => getCurrentLData()}
        >
          LIST CURRENT LANGUAGE STORAGE
        </Button>
        <Button
          mode="outlined"
          style={localStyles.button}
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={() => deleteCertainData()}
        >
          RUN CUSTOM DELETE METHOD
        </Button>
        <ScrollView>
          <Text style={localStyles.text}>{output}</Text>
        </ScrollView>
        <ManageFileModal
          visible={exportModalVisible}
          setVisible={setExportModalVisible}
          item={languageObj}
          title="Export Data"
          descriptionText="Here you can export your data as a CSV file and save it to your device."
          button1Text="Export All Data"
          isExportMode={true}
          button1Action={() => console.log("TODO - implement export all data")}
        />
        <ManageFileModal
          visible={importModalVisible}
          setVisible={setImportModalVisible}
          item={languageObj}
          title="Import Data"
          descriptionText="Here you can import your data from a CSV file. Warning: this will overwrite any existing data for an existing language."
          button1Text="Import Data for a new language"
          isExportMode={false}
          button1Action={() => importDataFromCSV("NEW_LANGUAGE")}
        />
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  text: {
    ...styles.regularText,
    margin: 10,
  },
  button: {
    ...styles.buttonRadius12M10,
    backgroundColor: Colors.WHITE,
    width: 300,
    alignSelf: "center",
  },
});
