import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

type SuccessModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const SuccessModal = (props: SuccessModalProps) => {
  const { visible, setVisible } = props;

  const hideModal = () => setVisible(false);

  // TO DO - uncomment for auto-hide modal after 2 seconds
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      hideModal();
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount or when visible changes
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={localStyles.contentContainer}
        style={localStyles.container}
      >
        <Text style={localStyles.messageText}>Success! {"\u{1F389}"}</Text>
      </Modal>
    </Portal>
  );
};

// TODO - check if these styles are duplicates that should be reusable.
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  contentContainer: {
    backgroundColor: Colors.main_theme.BACKGROUND_COLOR,
    padding: 20,
    borderRadius: 12,
  },
  messageText: {
    color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
    fontWeight: "bold",
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
});

export default SuccessModal;
