import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import styles from "@/assets/styles/styleSheet";

type Props = {
  label: string;
  onPress?: () => void;
  theme?: "primary";
};

// TODO - is this still useful? Currently not used anywhere as of 11/2/25

export default function Button({ label, onPress, theme }: Props) {
  if (theme === "primary") {
    return (
      <View
        style={[
          localStyles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[localStyles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={localStyles.buttonIcon}
          />
          <Text style={[localStyles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={localStyles.buttonContainer}>
      <Pressable
        style={localStyles.button}
        onPress={onPress}
      >
        <Text style={localStyles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    ...styles.flexRowJustifyCenter,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
