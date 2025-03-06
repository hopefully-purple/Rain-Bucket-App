import React, { useState, useContext } from "react";
import { Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import LanguageObjectContext from "@/contexts/LanguageObject";
import Colors from "@/assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { IWord } from "@/interfaces/languageObjectInterface";

export default function SettingsScreen() {
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const [output, setOutput] = useState("");

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

  const getAllKeys = async () => {
    let keys: any = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
      console.log("getAllKeys storage threw error " + e);
      throw e;
    }

    setOutput(keys[0] + ", " + keys[1]);
    // return keys;
    // console.log(JSON.stringify(keys));
    // return [];
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  const deleteCertainData = async () => {
    setOutput("Deleted words from context and storage that are missing an id");

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
    <SafeAreaView style={styles.screenContainer}>
      <Button
        style={styles.clearButton}
        textColor={Colors.main_theme.INACTIVE_ACCENT_COLOR}
        onPress={() => clearAllData()}
      >
        CLEAR STORAGE
      </Button>
      <Button
        style={styles.clearButton}
        textColor={Colors.main_theme.INACTIVE_ACCENT_COLOR}
        onPress={() => getAllKeys()}
      >
        GET ALL KEYS STORAGE
      </Button>
      <Button
        style={styles.clearButton}
        textColor={Colors.main_theme.INACTIVE_ACCENT_COLOR}
        onPress={() => getCurrentLData()}
      >
        LIST CURRENT LANGUAGE STORAGE
      </Button>
      <Button
        style={styles.clearButton}
        textColor={Colors.main_theme.INACTIVE_ACCENT_COLOR}
        onPress={() => deleteCertainData()}
      >
        RUN CUSTOM DELETE METHOD
      </Button>
      <ScrollView>
        <Text style={styles.text}>{output}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  input: {
    margin: 10,
  },
  text: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 20,
    margin: 10,
  },
  clearButton: {
    backgroundColor: Colors.LIGHT_RED,
    borderRadius: 12,
    width: 300,
    alignSelf: "center",
    margin: 10,
  },
});
