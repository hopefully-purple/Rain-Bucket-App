import Colors from "@/assets/colors/colors";
import * as React from "react";
import { View } from "react-native";
import { Menu, IconButton } from "react-native-paper";

const PaperMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-horizontal"
            iconColor={Colors.main_theme.ACTIVE_ACCENT_COLOR}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          title="Add"
          leadingIcon="plus"
          onPress={() => {
            console.log("Add");
          }}
        />
        <Menu.Item
          title="Edit"
          leadingIcon="pencil"
          onPress={() => {
            console.log("Edit");
          }}
        />
      </Menu>
    </View>
  );
};

export default PaperMenu;
