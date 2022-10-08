import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
// import {Text, NavigationContainer, SafeAreaView, View} from 'react-native';
import {View, SafeAreaView, Text} from 'react-native';
import LanguageObjectContext from './contexts/LanguageObject';
import SetOfLanguagesScreen from './screens/SetOfLanguagesScreen';
import LanguageScreen from './screens/LanguageScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const beginningObject = {
  language: '',
  words: [{id: '0', word: '', definition: ''}],
};

const Stack = createNativeStackNavigator();

function App() {
  const [languageObj, setLanguageObj] = useState(beginningObject);

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SetOfLanguages">
          <Stack.Screen
            name="SetOfLanguages"
            component={SetOfLanguagesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LanguageScreen"
            component={LanguageScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageObjectContext.Provider>
  );
}

export default App;
