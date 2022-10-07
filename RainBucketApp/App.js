import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import LanguageObjectContext from './contexts/LanguageObject';
import LanguageScreen from './screens/LanguageScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const beginningObject = {
  language: 'Spanish',
  words: [{id: 0, word: '', definition: ''}],
};

const App = () => {
  const [languageObj, setLanguageObj] = useState(beginningObject);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('Spanish');
      console.log('(App.readData) value:' + value);
      if (value !== null) {
        setLanguageObj({...beginningObject, words: JSON.parse(value)});
      } else {
        console.log('(App.readData).getItem value is null!');
      }
    } catch (e) {
      console.log(
        '(App.readData) Failed to fetch the input from storage: ' + e,
      );
      throw e;
    }
  };

  useEffect(() => {
    console.log('App.useEffect');
    readData();
  }, []);
  return (
    <LanguageObjectContext.Provider value={{languageObj, setLanguageObj}}>
      <LanguageScreen />
    </LanguageObjectContext.Provider>
  );
};

export default App;
