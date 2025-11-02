import Colors from "@/assets/colors/colors";
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  // from SortButton and paper menu
  // add if figure out how others can use this, then add on to them as they want.
  // {
  //       flexDirection: "row",
  //       justifyContent: "center",
  //     }
  flexRowJustifyCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
