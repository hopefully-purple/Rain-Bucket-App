import Colors from "@/assets/colors/colors";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { IWord } from "@/interfaces/languageObjectInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext } from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  StyleSheet,
} from "react-native";

type WordComponentProps = {
  item: IWord
};

export default function WordComponent({item}: WordComponentProps) {
  const { languageObj, setLanguageObj } = useContext(LanguageObjectContext);
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

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

  const changeItemAlert = () => {
    let body = item.definition;
    if (item.pronun !== undefined && item.pronun !== "") {
      body = "(" + item.pronun + ")\n" + item.definition;
    }
    Alert.alert(item.word, body, [
      {
        text: "Edit",
        onPress: () => {
          setSelectedItem(item);
          router.navigate("/language/edit-word-screen");
        },
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteItemInWords(),
      },
      { text: "Done", onPress: () => console.log("Done Pressed") },
    ]);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => changeItemAlert()}
      >
        <Text style={styles.itemWord}>{item.word}</Text>
        <Text style={styles.itemDefinition}> - {item.definition}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
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
  button: {
    color: Colors.main_theme.ACTIVE_ACCENT_COLOR,
  }
});
