import Colors from "@/assets/colors/colors";
import LanguageObjectContext from "@/contexts/LanguageObject";
import SelectedItemContext from "@/contexts/SelectedItem";
import { ILanguageObject } from "@/interfaces/languageObjectInterface";
import { Stack } from "expo-router";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

// Chapter 3 step 5 https://docs.expo.dev/tutorial/build-a-screen/#enhance-the-reusable-button-component

const beginningObject: ILanguageObject = {
  // TODO - this is weird, please make it right.
  language: "",
  words: [{ id: "0", word: "", pronun: "", definition: "" }],
};
// TODO - Improve how async storage and context is being used. Storing this empty object kinda makes no sense

export default function RootLayout() {
  const [languageObj, setLanguageObj] = useState(beginningObject);
  const [selectedItem, setSelectedItem] = useState({});
  return (
    <GestureHandlerRootView>
      <LanguageObjectContext.Provider value={{ languageObj, setLanguageObj }}>
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
          <PaperProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, title: "Home" }}
              />
              <Stack.Screen
                name="language/[language]"
                options={{
                  headerShown: true,
                  title: languageObj.language,
                  headerStyle: { backgroundColor: Colors.main_theme.BACKGROUND_COLOR},
                  headerTintColor: Colors.main_theme.ACTIVE_ACCENT_COLOR,
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },

                }}
              />
              <Stack.Screen
                name="language/edit-word-screen"
                options={{ headerShown: true, title: "blah" }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </PaperProvider>
        </SelectedItemContext.Provider>
      </LanguageObjectContext.Provider>
    </GestureHandlerRootView>
  );
}
