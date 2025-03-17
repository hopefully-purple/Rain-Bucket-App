import Colors from "@/assets/colors/colors";
import * as React from "react";
import { View } from "react-native";
import {
  Menu,
  IconButton,
  Portal,
  Dialog,
  Button,
  Text,
} from "react-native-paper";

const dialogText = "This button will give the user different sorting options like: A-Z, Z-A, Sort by Tags, Most Searched, etc";

const SortButton = () => {
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <IconButton
        icon="sort"
        iconColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Future Feature</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{dialogText}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SortButton;
