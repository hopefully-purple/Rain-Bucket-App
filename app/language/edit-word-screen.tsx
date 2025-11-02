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
    <SafeAreaView style={styles.screenContainer} edges={['right', 'bottom', 'left']}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <TextInput
          style={styles.wText}
          value={word}
          onChangeText={(text) => setWord(text)}
          autoCorrect={false}
          autoCapitalize={"none"}
          placeholder="Word or Phrase"
        />
        <TextInput
          style={styles.prText}
          placeholder="add pronunciation"
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
          style={{...styles.dText}}
          placeholder="Definition"
        />
        <Text style={styles.otherText}>Notes:</Text>
        <TextInput
          style={styles.otherText}
          value={notes}
          onChangeText={(text) => setNotes(text)}
          autoCorrect={false}
          autoCapitalize={"none"}
          multiline={true}
          placeholder="ways to remember, interesting cultural notes, etc..."
        />
        <Text style={styles.otherText}>Tags:</Text>
        <Text style={{...styles.otherText, color: Colors.main_theme.ACTIVE_ACCENT_COLOR}}>Look up in dictionary?</Text>
        <Button mode="elevated" style={styles.saveButton} textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR} onPress={handleSave}>
          Save changes
        </Button>
        <Text style={styles.otherText}>Related:</Text>
        </Pressable>
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
  wText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 30,
    fontWeight: "bold",
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
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 20,
    marginHorizontal: 20,
  },
  otherText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: Colors.main_theme.BACKGROUND_COLOR,
    borderRadius: 12,
    width: 190,
    alignSelf: "center",
    margin: 20,
  },
});
