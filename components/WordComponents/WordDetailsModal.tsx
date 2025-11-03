import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { IWord } from "@/interfaces/languageObjectInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

type WordDetailsModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: IWord;
};

const WordDetailsModal = (props: WordDetailsModalProps) => {
  const { visible, setVisible, item } = props;
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const hideModal = () => setVisible(false);

  const messageMap = {
    delete: "Delete",
    done: "Done",
    edit: "Edit",
  };

  function deleteItemInWords() {
    // Filter condition
    function excludeItem(i: IWord) {
      return i.id !== item.id;
    }
    const words = languageObj.words.filter(excludeItem);
    setLanguageObj({ ...languageObj, words: words });
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(languageObj.language, JSON.stringify(words));
        // console.log("(saveData) Data successfully saved");
      } catch (e) {
        console.log("(saveData) Failed to save the data to the storage");
        throw e;
      }
    };

    saveData();
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
        <Text style={localStyles.wText}>{item.word}</Text>
        {item.pronun !== "" && item.pronun !== undefined && (
          <Text style={localStyles.prText}>{item.pronun}</Text>
        )}
        <Text style={localStyles.dText}>{item.definition}</Text>
        {item.notes !== "" && item.notes !== undefined && (
          <Text style={localStyles.otherText}>{item.notes}</Text>
        )}
        <Text
          style={{
            ...localStyles.otherText,
            color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
          }}
          onPress={() => {
            setSelectedItem(item);
            hideModal();
            router.navigate("/language/edit-word-screen");
          }}
        >
          {messageMap.edit}
        </Text>
        <Text
          style={{
            ...localStyles.otherText,
            color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
          }}
          onPress={() => {
            deleteItemInWords();
            hideModal();
          }}
        >
          {messageMap.delete}
        </Text>
        <Text
          style={{
            ...localStyles.otherText,
            color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
            marginBottom: 20,
          }}
          onPress={hideModal}
        >
          {messageMap.done}
        </Text>
      </Modal>
    </Portal>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  wText: {
    ...styles.boldText,
    fontSize: 30,
    margin: 20,
  },
  prText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 15,
    fontStyle: "italic",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dText: {
    ...styles.regularText,
    marginHorizontal: 20,
  },
  otherText: {
    ...styles.regularText,
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default WordDetailsModal;
