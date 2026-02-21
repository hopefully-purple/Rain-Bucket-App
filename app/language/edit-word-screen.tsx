import React, { useState, useContext } from "react";
import { Text, TextInput, StyleSheet, Pressable, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import Colors from "@/assets/colors/colors";
import { router } from "expo-router";
import { asyncStorageSaveData } from "@/utilities/utility-async-storage";
import { updateOrAddWordInLanguageObject } from "@/utilities/utility-context";
import { SafeAreaView } from "react-native-safe-area-context";
import styles, { STANDARD_BUTTON_RADIUS } from "@/assets/styles/styleSheet";

//Item format as it comes from Add: {id: '0 word', word: '', definition: ''}
// TODO - rename as [word].tsx for a better route path

export default function EditWordScreen() {
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const [word, setWord] = useState(selectedItem.word);
  const [pronunciation, setPron] = useState(selectedItem.pronun);
  const [definition, setDefinition] = useState(selectedItem.definition);
  const [notes, setNotes] = useState(selectedItem.notes);

  const [defHeight, setDefHeight] = useState(0);

  const messageMap = {
  addPronounciation: "add pronunciation",
  definition: "Definition",
  lookUp: "Look up in dictionary?",
  notes: "Notes:",
  related: "Related:",
  saveChanges: "Save changes",
  tags: "Tags:",
  waysToRemember: "ways to remember, interesting cultural notes, etc...",
  wordOrPhrase: "Word or Phrase",
};

  const handleSave = async () => {
    // console.log("#2(handlesave)New stuff:");
    // console.log(word);
    // console.log("/" + pronunciation + "/");
    // console.log(definition);
    // console.log(notes);

    // console.log("\n\n current selected item before any checks:");
    // console.log(JSON.stringify(selectedItem, undefined, 2));

    // TODO - move this logic somewhere else
    //Make comparisons to state and context and update accordingly.
    let newI = { ...selectedItem };
    if (selectedItem.id === undefined) {
      let newID = languageObj.words.length + 1;
      newI = { ...newI, id: newID + " " + word };
    }
    // console.log("NewI=" + JSON.stringify(newI, undefined, 2));
    let changesMade = false;

    if (word !== selectedItem.word) {
      // console.log("Word check: " + word + " !== " + selectedItem.word);
      newI = {
        ...newI,
        word,
      };
      changesMade = true;
      // console.log("newI:" + JSON.stringify(newI, undefined, 2));
    }
    if (pronunciation !== selectedItem.pronun) {
      // console.log(
      // "Pronun check: " + pronunciation + " !== " + selectedItem.pronun
      // );
      newI = {
        ...newI,
        pronun: pronunciation,
      };
      // console.log("newI:" + JSON.stringify(newI, undefined, 2));
      changesMade = true;
    }
    if (definition !== selectedItem.definition) {
      // console.log(
      // "Definition check: " + definition + " !== " + selectedItem.definition
      // );
      newI = {
        ...newI,
        definition,
      };
      changesMade = true;
      // console.log("newI:" + JSON.stringify(newI, undefined, 2));
    }
    if (notes !== selectedItem.notes) {
      // console.log(" Notes check: " + notes + " !== " + selectedItem.notes);
      newI = {
        ...newI,
        notes: notes,
      };
      changesMade = true;
    }
    //TODO: Implement checking Tags! Is tags even a thing yet?

    //Get selectedItem from langaugeObj and replace with new selected item
    if (changesMade) {
      // console.log("#3a(handlesave) changesMade = true, call update word in lang obj");
      // Update the language object with new word object
      const newLanguageObject = updateOrAddWordInLanguageObject(
        languageObj,
        newI,
        selectedItem.id
      );
      // console.log("#4(handlesave) newLanguageObject = ");
      // console.log(JSON.stringify(newLanguageObject, undefined, 2));

      // Set language object
      setLanguageObj({ ...languageObj, words: newLanguageObject.words });

      //Save to async ( // TODO - need to start thinking about changing structure)
      //^^ when implementing other props changes, need to be smart about when this happens
      // console.log("#5(handlesave) call saveData");
      const isDataSaved = await asyncStorageSaveData(newLanguageObject);
      if (!isDataSaved) {
        console.log("------AAAAA???--------");
      }
      // console.log("#8(handlesave) set selectedItem to empty??? ... I think yes?");
      // TODO - should selectedItem be set to empty here? I think so, because we don't want it highlighted or whatever in langauge?
      setSelectedItem({});
      // console.log("#9(handlesave) router back");
      router.back();
    } else {
      console.log(
        "#3b(handlesave)Nothing to change : pronunciation=" + pronunciation
      );
      // TODO - should this router.back? should display message "no changes made"?
    }
  };

  return (
    <SafeAreaView
      style={styles.screenContainer}
      edges={["right", "bottom", "left"]}
    >
      <Pressable onPress={() => Keyboard.dismiss()}>
        <TextInput
          style={localStyles.wText}
          value={word}
          onChangeText={(text) => setWord(text)}
          autoCorrect={false}
          autoCapitalize={"none"}
          placeholder={messageMap.wordOrPhrase}
        />
        <TextInput
          style={localStyles.prText}
          placeholder={messageMap.addPronounciation}
          value={pronunciation}
          onChangeText={(text) => setPron(text)}
          autoCorrect={false}
          autoCapitalize={"sentences"}
        />
        <TextInput
          value={definition}
          multiline={true}
          onChangeText={(text) => setDefinition(text)}
          autoCorrect={false}
          autoCapitalize={"none"}
          onContentSizeChange={(event) => {
            setDefHeight(event.nativeEvent.contentSize.height);
          }}
          style={{ ...localStyles.dText }}
          placeholder={messageMap.definition}
        />
        <Text style={localStyles.otherText}>{messageMap.notes}</Text>
        <TextInput
          style={localStyles.otherText}
          value={notes}
          onChangeText={(text) => setNotes(text)}
          autoCorrect={false}
          autoCapitalize={"none"}
          multiline={true}
          placeholder={messageMap.waysToRemember}
        />
        <Text style={localStyles.otherText}>{messageMap.tags}</Text>
        <Text
          style={{
            ...localStyles.otherText,
            color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
          }}
        >
          {messageMap.lookUp}
        </Text>
        <Button
          mode="elevated"
          style={localStyles.saveButton}
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={handleSave}
        >
          {messageMap.saveChanges}
        </Button>
        <Text style={localStyles.otherText}>{messageMap.related}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  wText: {
    ...styles.boldText,
    fontSize: 30,
    marginHorizontal: 20,
    marginTop: 20,
  },
  prText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 15,
    fontStyle: "italic",
    margin: 20,
  },
  dText: {
    ...styles.regularText,
    marginHorizontal: 20,
  },
  otherText: {
    ...styles.regularText,
    marginHorizontal: 20,
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: Colors.main_theme.BACKGROUND_COLOR,
    borderRadius: STANDARD_BUTTON_RADIUS,
    width: 190,
    alignSelf: "center",
    margin: 20,
  },
});
