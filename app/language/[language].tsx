import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { Button, TextInput } from "react-native-paper";
import { IWord } from "@/interfaces/languageObjectInterface";
import ListOfWords from "@/components/ListOfWords";
import { organizeIntoAlphabetizedSections } from "@/utilities/utility-strings";
import { ISectionListData } from "@/interfaces/sectionListInterface";
import { asyncStorageSaveData } from "@/utilities/utility-async-storage";
import {
  checkForDuplicates,
  updateOrAddWordInLanguageObject,
} from "@/utilities/utility-context";
import Colors from "@/assets/colors/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageScreen(this: any) {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const { language } = useLocalSearchParams();

  const duplicateAlert = () => {
    //Clear inputs
    setWord("");
    setDefinition("");
    Keyboard.dismiss();

    Alert.alert("Word already exists", "", [
      {
        text: "Done",
        onPress: () => {
          console.log("Done Pressed");
        },
      },
    ]);
  };

  const handleAddWord = async () => {
    if (word !== "" && definition !== "") {
      // console.log(
      //   "(handleaddword) languageObj.words.length=" + languageObj.words.length
      // );
      let newID = languageObj.words.length + 1;
      //Create word object
      const newWordItem: IWord = {
        id: newID + " " + word,
        word,
        pronun: "",
        definition,
      };
      // console.log("(handleAddWord) newWordItem.id=" + newWordItem.id);

      const isDuplicate = checkForDuplicates(languageObj, newWordItem);
      if (isDuplicate) {
        duplicateAlert();
        return;
      }

      // console.log("(handleAddWord) call updateOrAddWordInLanguageObject");
      const newLanguageObject = updateOrAddWordInLanguageObject(
        languageObj,
        newWordItem
      );
      // console.log("(handleAddWord) resulting newLanguageObject: ");
      // console.log(JSON.stringify(newLanguageObject, undefined, 2));

      // console.log("(handleAddWord) update languageObject context");
      setLanguageObj({ ...languageObj, words: newLanguageObject.words });

      // console.log("(handleAddWord) is languageObj updated with new words?");
      // console.log(JSON.stringify(languageObj.words, undefined, 2));

      //Save to async storage
      // console.log("(handleAddWord) call asyncStorageSaveData");
      const isDataSaved = await asyncStorageSaveData(languageObj);
      if (!isDataSaved) {
        // TODO - handle this better!
        console.log("------AAAAA???--------");
      }

      //Clear inputs
      setWord("");
      setDefinition("");
    } else {
      console.log("Nothing to add");
    }
    Keyboard.dismiss();
  };

  const [sectionList, setSectionList] = useState([] as ISectionListData);
  useEffect(
    function createSectionList() {
      console.log(
        "([language].createSectionList) how often is useEffect called?"
      );
      if (searchQuery === "") {
        const newSectionL = organizeIntoAlphabetizedSections(languageObj);
        setSectionList(newSectionL);
      }
    },
    [languageObj, searchQuery]
  );

  const createSearchSectionList = (query: string) => {
    // Filter languagObj.words on .word
    let searchList = languageObj.words.filter(
      (i: IWord) =>
        i.word.toLowerCase().includes(query.toLowerCase()) ||
        i.definition.toLowerCase().includes(query.toLowerCase())
    );
    // Set resulting array to section list
    // console.log(JSON.stringify(searchList, undefined, 2));
    const newS: ISectionListData = [
      {
        title: "Words including " + query,
        data: searchList,
      },
    ];
    return newS;
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // console.log(searchQuery);
    setSectionList(createSearchSectionList(query));
  };

  const wordInputLabel = "New " + languageObj.language + " word/phrase";

  useFocusEffect(
    useCallback(() => {
      setWord("");
      setDefinition("");
    }, [])
  );
  return (
    <SafeAreaView style={styles.screenContainer} edges={['right', 'bottom', 'left']}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <TextInput
          label={wordInputLabel}
          value={word}
          onChangeText={(text) => setWord(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          autoCorrect={false}
          autoCapitalize={"sentences"}
        />
        <TextInput
          label="Definition"
          value={definition}
          onChangeText={(text) => setDefinition(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          autoCapitalize={"sentences"}
          autoCorrect={false}
        />
        <View style={styles.buttonLayout}>
          <Button
            mode="elevated"
            style={styles.addButton}
            textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
            onPress={handleAddWord}
          >
            Quick Add
          </Button>
          <Button
            mode="elevated"
            style={styles.detailButton}
            textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
            onPress={() => {
              // console.log(
              // "#1(addWDetails) onPress - set selectedItem (should that happen?) and navigate to edit-word"
              // );
              const isDuplicate = checkForDuplicates(languageObj, {
                id: "",
                word,
                definition,
              });
              if (isDuplicate) {
                duplicateAlert();
                return;
              }

              setSelectedItem({ word, definition });
              Keyboard.dismiss();
              router.navigate("/language/edit-word-screen");
            }}
          >
            Add with details
          </Button>
        </View>
        <TextInput
          label="Search"
          mode="outlined"
          dense={true}
          activeOutlineColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          value={searchQuery}
          autoCorrect={false}
          autoCapitalize={"sentences"}
          onChangeText={onChangeSearch}
          style={styles.searchBar}
          left={
            <TextInput.Icon
              icon="magnify"
              color={Colors.main_theme.TEXT_DARK_GRAY}
            />
          }
        />
      </Pressable>
      <ListOfWords sectionL={sectionList} />
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
  searchBar: {
    margin: 10,
  },
  text: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 20,
    margin: 10,
  },
  buttonLayout: {
    flexDirection: "row",
  },
  addButton: {
    borderRadius: 12,
    width: 150,
    margin: 10,
  },
  detailButton: {
    borderRadius: 12,
    width: 200,
    margin: 10,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  screenTop: {
    display: "flex",
    flexDirection: "row",
  },
});
