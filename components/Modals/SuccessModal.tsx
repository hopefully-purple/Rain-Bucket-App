import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

type SuccessModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const SuccessModal = (props: SuccessModalProps) => {
  const { visible, setVisible } = props;

  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
       Success!
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

export default SuccessModal;
