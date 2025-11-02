import { IWord } from "@/interfaces/languageObjectInterface";
import * as React from "react";
import { View } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";

type WordDetailsModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: IWord;
};

const WordDetailsModal = (props: WordDetailsModalProps) => {
  const { visible, setVisible, item } = props;

  //   const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>{item.word}</Text>
        </Modal>
      </Portal>
      {/* <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button> */}
    </View>
  );
};

export default WordDetailsModal;
