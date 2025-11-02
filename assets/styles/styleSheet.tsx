import Colors from "@/assets/colors/colors";
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  flexRowJustifyCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonRadius12M10: {
    borderRadius: 12,
    margin: 10,
  },
});

export default styles;
