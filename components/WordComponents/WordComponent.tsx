import Colors from "@/assets/colors/colors";
import { IWord } from "@/interfaces/languageObjectInterface";
import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import WordDetailsModal from "./WordDetailsModal";

type WordComponentProps = {
  item: IWord;
};

export default function WordComponent({ item }: WordComponentProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={localStyles.item}
        onLongPress={() => setVisible(true)}
      >
        <Text style={localStyles.itemWord}>{item.word}</Text>
        <Text style={localStyles.itemDefinition}> - {item.definition}</Text>
      </TouchableOpacity>
      <WordDetailsModal visible={visible} setVisible={setVisible} item={item} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  itemWord: {
    fontSize: 18,
    height: 44,
    color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
  },
  itemDefinition: {
    fontSize: 18,
    height: 44,
  },
  item: {
    flexDirection: "row",
    paddingTop: 10,
  },
});
