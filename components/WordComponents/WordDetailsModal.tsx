import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import SelectedItemContext from "@/contexts/SelectedItem";
import { IWord } from "@/interfaces/languageObjectInterface";
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
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const hideModal = () => setVisible(false);

  const messageMap = {
    delete: "Delete",
    done: "Done",
    edit: "Edit",
  };

  return (
    // <View >
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
        <Text style={localStyles.wText}>{item.word}</Text>
        <Text style={localStyles.prText}>{item.pronun}</Text>
        <Text style={localStyles.dText}>{item.definition}</Text>
        <Text style={localStyles.otherText}>{item.notes}</Text>
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
        >
          {messageMap.delete}
        </Text>
        <Text
          style={{
            ...localStyles.otherText,
            color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
          }}
        >
          {messageMap.done}
        </Text>
      </Modal>
    </Portal>
    // </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 20,
  },
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
    marginTop: 20,
  },
});

export default WordDetailsModal;
