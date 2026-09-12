import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import { ILanguageObject } from "@/interfaces/languageObjectInterface";
import {
  asyncStorageGetAllKeys,
  asyncStorageGetDataFromKey,
} from "@/utilities/utility-async-storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import {
  importDataFromCSV,
  exportDataToCSV,
} from "@/utilities/csvFileOperations";
import NotificationModal from "./NotificationModal";

type ManageFileModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  item: ILanguageObject;
  title: string;
  descriptionText: string;
  button1Text: string;
  button1Action?: () => Promise<boolean>;
  isExportMode: boolean;
};

// TODO - rename some variables?

const ManageFileModal = (props: ManageFileModalProps) => {
  const {
    visible,
    setVisible,
    item,
    title,
    descriptionText,
    button1Text,
    button1Action,
    isExportMode,
  } = props;
  const [storageKeys, setStorageKeys] = useState<string[]>([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const hideModal = () => setVisible(false);

  // TODO: make messageMap dynamic
  const messageMap = {
    exportDataFor: "Export data for {key}",
    importDataFor: "Import data for {key}",
    success: "Success! \u{1F389}",
    failed: "Failed! \u{1F6AB}",
  };

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
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={localStyles.contentContainer}
          style={localStyles.container}
        >
          <Text style={localStyles.wText}>{title}</Text>
          <Text style={localStyles.prText}>{descriptionText}</Text>
          <Button
            mode="outlined"
            style={localStyles.button}
            textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
            onPress={async () => {
              if (button1Action) {
                const result = await button1Action();
                console.log(
                  "(manageFileModal onpress) Result for button1Action: " +
                    result,
                );
                hideModal();
                setShowNotificationModal(result);
              }
            }}
          >
            {button1Text}
          </Button>
          {storageKeys.map((key: string) => (
            <Button
              key={key}
              mode="outlined"
              style={localStyles.button}
              textColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
              onPress={async () => {
                if (isExportMode) {
                  // handle export for this key
                  const data = await asyncStorageGetDataFromKey(key);
                  // console.log("(manageFileModal onpress) Data for key " + key + ": " + data);
                  const result = await exportDataToCSV(data, key);
                  console.log(
                    "(manageFileModal onpress) Export result for key " +
                      key +
                      ": " +
                      result,
                  );
                  hideModal();
                  setShowNotificationModal(result);
                } else {
                  // handle import for this key
                  const result = await importDataFromCSV(key);
                  console.log(
                    "(manageFileModal onpress) Import result for key " +
                      key +
                      ": " +
                      result,
                  );
                  hideModal();
                  setShowNotificationModal(result);
                }
              }}
            >
              {isExportMode
                ? messageMap.exportDataFor.replace("{key}", key)
                : messageMap.importDataFor.replace("{key}", key)}
            </Button>
          ))}
        </Modal>
      </Portal>
      <NotificationModal
        visible={showNotificationModal}
        setVisible={setShowNotificationModal}
        message={messageMap.success}
      />
    </>
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
