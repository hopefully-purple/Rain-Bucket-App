import Colors from "@/assets/colors/colors";
import { StyleSheet } from "react-native";

export const STANDARD_BUTTON_RADIUS = 12;

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
    borderRadius: STANDARD_BUTTON_RADIUS,
    margin: 10,
  },
  regularText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontSize: 20,
  },
  boldText: {
    color: Colors.main_theme.TEXT_DARK_GRAY,
    fontWeight: "bold",
  },
});

export default styles;
