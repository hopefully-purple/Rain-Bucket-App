import Colors from "@/assets/colors/colors";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { IWord } from "@/interfaces/languageObjectInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import WordDetailsModal from "./WordDetailsModal";

type WordComponentProps = {
  item: IWord;
};

export default function WordComponent({ item }: WordComponentProps) {
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const [visible, setVisible] = useState(false);

  const messageMap = {
    delete: "Delete",
    done: "Done",
    edit: "Edit",
  };

  function deleteItemInWords() {
    // Filter condition
    function excludeItem(i: IWord) {
      return i.id !== item.id;
    }
    const words = languageObj.words.filter(excludeItem);
    setLanguageObj({ ...languageObj, words: words });
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(languageObj.language, JSON.stringify(words));
        // console.log("(saveData) Data successfully saved");
      } catch (e) {
        console.log("(saveData) Failed to save the data to the storage");
        throw e;
      }
    };

    saveData();
  }

  // const changeItemAlert = () => {
  //   let body = item.definition;
  //   if (item.pronun !== undefined && item.pronun !== "") {
  //     body = "(" + item.pronun + ")\n" + item.definition;
  //   }
  //   Alert.alert(item.word, body, [
  //     {
  //       text: messageMap.edit,
  //       onPress: () => {
          // setSelectedItem(item);
          // router.navigate("/language/edit-word-screen");
  //       },
  //     },
  //     {
  //       text: messageMap.delete,
  //       style: "destructive",
  //       onPress: () => deleteItemInWords(),
  //     },
  //     { text: messageMap.done, onPress: () => console.log("Done Pressed") },
  //   ]);
  // };

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
