import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { Button, TextInput } from "react-native-paper";
import { IWord } from "@/interfaces/languageObjectInterface";
import ListOfWords from "@/components/ListOfWords";
import { organizeIntoAlphabetizedSections } from "@/utilities/utility-strings";
import { ISectionListData } from "@/interfaces/sectionListInterface";
import { asyncStorageSaveData } from "@/utilities/utility-async-storage";
import { updateOrAddWordInLanguageObject } from "@/utilities/utility-context";

export default function LanguageScreen(this: any) {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const { language } = useLocalSearchParams();

  this.searchInput = createRef();
  // this.wordInput = React.createRef();
  // this.definitionInput = React.createRef();

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
      
      // console.log("(handleAddWord) call updateOrAddWordInLanguageObject");
      const newLanguageObject = updateOrAddWordInLanguageObject(languageObj, newWordItem);
      // console.log("(handleAddWord) resulting newLanguageObject: ");
      // console.log(JSON.stringify(newLanguageObject, undefined, 2));

      // console.log("(handleAddWord) update languageObject context");
      setLanguageObj({...languageObj, words: newLanguageObject.words});

      // console.log("(handleAddWord) is languageObj updated with new words?");
      // console.log(JSON.stringify(languageObj.words, undefined, 2));

      //Clear inputs
      // this.wordInput.current.clear();
      // this.definitionInput.current.clear();
      setWord("");
      setDefinition("");

      //Save to async storage
      // console.log("(handleAddWord) call asyncStorageSaveData");
      const isDataSaved = await asyncStorageSaveData(languageObj);
      if (!isDataSaved) {
        // TODO - handle this better!
        console.log("------AAAAA???--------");
      }
    } else {
      console.log("Nothing to add");
    }
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

  const onSubmitSearch = () => {
    this.searchInput.current.blur();
  };

  const wordInputLabel = "New " + languageObj.language + " word/phrase";

  useFocusEffect(
    useCallback(() => {
      // const unsubscribe = API.subscribe(userId, user => setUser(user));
      // return () => unsubscribe();
      //Clear inputs
      // this.wordInput.current.clear();
      // this.definitionInput.current.clear();
      setWord("");
      setDefinition("");
    }, [])
  );
  return (
    <SafeAreaView
      style={styles.screenContainer}
      onTouchStart={() => {
        this.searchInput.current.blur();
        // this.wordInput.current.blur();
        // this.definitionInput.current.blur();
      }}
    >
      <View style={styles.screenTop}>
        <TouchableOpacity
          style={styles.titleTouchable}
          // onPress={() => navigation.navigate("SetOfLanguages")}
        >
          <Text style={styles.text}>{language} Screen!</Text>
        </TouchableOpacity>
        <TextInput
          label="Search"
          mode="outlined"
          dense={true}
          activeOutlineColor={Colors.TEST_PURPLE}
          value={searchQuery}
          autoCorrect={false}
          autoCapitalize={"sentences"}
          onChangeText={onChangeSearch}
          // onSubmitEditing={onSubmitSearch}
          style={styles.searchBar}
          left={<TextInput.Icon icon="magnify" color={Colors.TEST_PURPLE} />}
          ref={this.searchInput}
        />
      </View>
      <TextInput
        label={wordInputLabel}
        value={word}
        onChangeText={(text) => setWord(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.TEST_PURPLE}
        autoCorrect={false}
        autoCapitalize={"sentences"}
        // blurOnSubmit="true"
        // ref={this.wordInput}
      />
      <TextInput
        label="Definition"
        value={definition}
        onChangeText={(text) => setDefinition(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.TEST_PURPLE}
        autoCapitalize={"sentences"}
        autoCorrect={false}
        // blurOnSubmit="true" // Todo - what is default behavior? use "submitBehavior"
        // ref={this.definitionInput}
      />
      <View style={styles.buttonLayout}>
        <Button
          mode="elevated"
          style={styles.addButton}
          onPress={handleAddWord}
        >
          Add!
        </Button>
        <Button
          mode="elevated"
          style={styles.detailButton}
          onPress={() => {
            // console.log(
              // "#1(addWDetails) onPress - set selectedItem (should that happen?) and navigate to edit-word"
            // );
            setSelectedItem({ word, definition });
            router.navigate("/language/edit-word-screen");
          }}
        >
          Add with details
        </Button>
      </View>
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
  titleTouchable: {
    // margin: 1,
  },
  text: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
    backgroundColor: Colors.LIGHT_PURPLE,
    // padding: 1,
    // paddingBottom: 10,
  },
  buttonLayout: {
    flexDirection: "row",
    // alignItems: '',
    marginLeft: 40,
  },
  addButton: {
    backgroundColor: Colors.LIGHT_PURPLE,
    borderRadius: 12,
    width: 100,
    margin: 10,
  },
  detailButton: {
    backgroundColor: Colors.LIGHT_PURPLE,
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
  searchBar: {
    width: 100,
    // height: 20,
    flexGrow: 1,
    // flexShrink: 1,
    marginRight: 10,
  },
});
