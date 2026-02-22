import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { saveDataToCSV } from "@/file-management/movingFiles";
import { ILanguageObject, IWord } from "@/interfaces/languageObjectInterface";
import { asyncStorageGetAllKeys, asyncStorageGetDataFromKey } from "@/utilities/utility-async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

type ManageFileModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: ILanguageObject;
};

const ManageFileModal = (props: ManageFileModalProps) => {
  const { visible, setVisible, item } = props;
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);
  const [storageKeys, setStorageKeys] = useState<string[]>([]);

  const hideModal = () => setVisible(false);

  // load AsyncStorage keys when modal is shown
  useEffect(() => {
    let mounted = true;
    if (!visible) return;
    console.log("[ManageFileModal] (useEffect) how many times does this run?"); // Just the 1 so far.
    asyncStorageGetAllKeys()
      .then((keys: string[]) => {
        if (mounted) setStorageKeys(keys);
      })
      .catch((err) => console.warn("Failed to load storage keys", err));
    return () => {
      mounted = false;
    };
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
        <Text style={localStyles.wText}>Manage Files</Text>
        <Text style={localStyles.prText}>
          Here you can export your data as a CSV file and save it to your
          device.
        </Text>
        <Button
          mode="outlined"
          style={localStyles.button}
          textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
          onPress={() => {
            // handle export for all data
          }}
        >
          Export all language data
        </Button>
        {storageKeys.map((key: string) => (
          <Button
            key={key}
            mode="outlined"
            style={localStyles.button}
            textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
            onPress={async () => {
              // handle export for this key
              const data = await asyncStorageGetDataFromKey(key);
              console.log("Data for key " + key + ": " + data);
              await saveDataToCSV(data);
            }}
          >
            Export data for {key}
          </Button>
        ))}
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
  button: {
    ...styles.buttonRadius12M10,
    backgroundColor: Colors.WHITE,
    width: 300,
    alignSelf: "center",
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
