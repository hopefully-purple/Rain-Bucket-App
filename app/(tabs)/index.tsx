import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Colors from "@/assets/colors/colors";
import { Link, router } from "expo-router";
import React, { useContext } from "react";
import LanguageObjectContext from "@/contexts/LanguageObject";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILanguageObject } from "@/interfaces/languageObjectInterface";

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
      <SafeAreaView style={styles.screenContainer}>
        {/* <Text style={styles.titleText}>Choose a language!</Text> */}
        <TouchableOpacity onPress={() => handleLanguageSelection("Spanish")}>
          <Text style={styles.languageText}>Spanish</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLanguageSelection("Japanese")}>
          <Text style={styles.languageText}>Japanese</Text>
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
  titleText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 25,
    margin: 10,
    padding: 5,
    backgroundColor: Colors.LIGHT_PURPLE,
  },
  languageText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
    // backgroundColor: Colors.LIGHT_PURPLE,
  },
  logoContainer: {
    // margin: 100,
  },
  logo: {
    height: 300,
    marginTop: 100,
    alignSelf: "center",
  },
  logoText: {
    color: Colors.TEST_PURPLE,
    fontSize: 25,
    margin: 10,
    padding: 5,
    alignSelf: "center",
  },
});
