import ImageViewer from "@/components/ImageViewer";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "@/assets/colors/colors";
import { Link, router } from "expo-router";
import React, { useContext } from "react";
import LanguageObjectContext from "@/contexts/LanguageObject";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILanguageObject } from "@/interfaces/languageObjectInterface";
import { Icon, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const RainBucketImage = require("@/assets/images/ORIGpurple_rainbucket_2.jpeg");

export default function Index() {
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);

  const readData = async (language: string) => {
    try {
      const value = await AsyncStorage.getItem(language);
      // console.log('(App.readData) value:' + value);
      if (value !== null) {
        setLanguageObj({ language: language, words: JSON.parse(value) });
      } else {
        // console.log(
        //   "(App.readData).getItem value is null! create a new " +
        //     language +
        //     " object"
        // );
        const newLanguage: ILanguageObject = {
          language: language,
          words: [{ id: "0", word: "", pronun: "", definition: "" }],
        };
        setLanguageObj(newLanguage);
      }
    } catch (e) {
      console.log(
        "(App.readData) Failed to fetch the input from storage: " + e
      );
      throw e;
    }
  };

  const handleLanguageSelection = (language: string) => {
    // console.log(language);
    readData(language);
    router.navigate(`/language/${language}`);
  };
  return (
    <>
      <SafeAreaView style={styles.screenContainer} edges={['right', 'bottom', 'left']}>
        <TouchableOpacity onPress={() => handleLanguageSelection("Spanish")}>
          <View style={styles.languageRow}>
            <Text style={styles.languageText}>Spanish</Text>
            <Icon
              source="chevron-right"
              color={Colors.main_theme.TEXT_DARK_GRAY}
              size={30}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLanguageSelection("Japanese")}>
          <View style={styles.languageRow}>
            <Text style={styles.languageText}>Japanese</Text>
            <Icon
              source="chevron-right"
              color={Colors.main_theme.TEXT_DARK_GRAY}
              size={30}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <ImageViewer imgSource={RainBucketImage} />
          <Text style={styles.logoText}>Rainbucket App</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  languageText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 20,
    fontWeight: "bold",
  },
  languageRow: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    display: "flex",
    alignSelf: "center",
  },
  logoText: {
    color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
    fontSize: 25,
    margin: 10,
    padding: 5,
    alignSelf: "center",
  },
});
