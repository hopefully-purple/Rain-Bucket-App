import Colors from "@/assets/colors/colors";
import styles from "@/assets/styles/styleSheet";
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

const dialogText =
  "The Add button will allow the user to add a new Language. The Edit button will allow the user to customize the list ordering, delete, rename, even set a color theme for each language";

const PaperMenu = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => {
    setDialogVisible(false);
    setMenuVisible(false);
  };

  return (
    <View
      style={styles.flexRowJustifyCenter}
    >
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-horizontal"
            iconColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item title="Add" leadingIcon="plus" onPress={showDialog} />
        <Menu.Item title="Edit" leadingIcon="pencil" onPress={showDialog} />
      </Menu>
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

export default PaperMenu;
