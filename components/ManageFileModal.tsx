import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { ILanguageObject, IWord } from "@/interfaces/languageObjectInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as React from "react";
import { useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

type ManageFileModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: ILanguageObject;
};

const ManageFileModal = (props: ManageFileModalProps) => {
  const { visible, setVisible, item } = props;
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const hideModal = () => setVisible(false);

  
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
        <Text style={localStyles.wText}>Manage Files</Text>
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

export default ManageFileModal;
