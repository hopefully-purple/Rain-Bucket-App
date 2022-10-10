import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import LanguageObjectContext from './contexts/LanguageObject';
import SelectedItemContext from './contexts/SelectedItem';
import SetOfLanguagesScreen from './screens/SetOfLanguagesScreen';
import LanguageScreen from './screens/LanguageScreen';
import SettingsScreen from './screens/SettingsScreen';
import EditWordScreen from './screens/EditWordScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const beginningObject = {
  language: '',
  words: [{id: '0', word: '', definition: ''}],
};

const Stack = createNativeStackNavigator();

function App() {
  const [languageObj, setLanguageObj] = useState(beginningObject);
  const [selectedItem, setSelectedItem] = useState({});

  // const readData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('Spanish');
  //     console.log('(App.readData) value:' + value);
  //     if (value !== null) {
  //       setLanguageObj({...beginningObject, words: JSON.parse(value)});
  //     } else {
  //       console.log('(App.readData).getItem value is null!');
  //     }
  //   } catch (e) {
  //     console.log(
  //       '(App.readData) Failed to fetch the input from storage: ' + e,
  //     );
  //     throw e;
  //   }
  // };

  // useEffect(() => {
  //   console.log('App.useEffect');
  //   readData();
  // }, []);
  return (
    <LanguageObjectContext.Provider value={{languageObj, setLanguageObj}}>
      <SelectedItemContext.Provider value={{selectedItem, setSelectedItem}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SetOfLanguages">
            <Stack.Screen
              name="SetOfLanguages"
              component={SetOfLanguagesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="LanguageScreen"
              component={LanguageScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditingScreen"
              component={EditWordScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SelectedItemContext.Provider>
    </LanguageObjectContext.Provider>
  );
}

export default App;
