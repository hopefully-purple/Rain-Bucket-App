import styles from "@/assets/styles/styleSheet";
import { IWord } from "@/interfaces/languageObjectInterface";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

type WordDetailsModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: IWord;
};

const WordDetailsModal = (props: WordDetailsModalProps) => {
  const { visible, setVisible, item } = props;

  const hideModal = () => setVisible(false);

  return (
    // <View >
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
        <Text>{item.word}</Text>
        <Text>{item.pronun}</Text>
        <Text>{item.definition}</Text>
        <Text>{item.notes}</Text>
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
});

export default WordDetailsModal;
