/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import LanguageObjectContext from './contexts/LanguageObject';
import LanguageScreen from './screens/LanguageScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Navigation from './screens/Navigation/Navigation';
// import UserContext from './contexts/User';

const languageObject = {
  language: 'Spanish',
  words: [
    {id: 1, word: 'baja', definition: 'down'},
    {id: 2, word: 'cerrado', definition: 'closed'},
    {id: 3, word: 'afuera', definition: 'outside'},
  ],
};

const beginningObject = {
  language: 'Spanish',
  words: [{id: 0, word: '', definition: ''}],
};

const App = () => {
  const [languageObj, setLanguageObj] = useState(beginningObject);
  // const appState = useRef(AppState.currentState);
  // Set langobj to Async storage contents!!

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('Spanish');
      console.log('(App.readData) value:' + value);
      if (value !== null) {
        beginningObject.words = JSON.parse(value);
        setLanguageObj(beginningObject);
      } else {
        console.log('(App.readData).getItem value is null!');
      }
    } catch (e) {
      console.log('(App.readData) Failed to fetch the input from storage: ' + e);
      throw e;
    }
  };

  useEffect(() => {
    console.log('App.useEffect');
    readData();
  }, []);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log(
  //         'App has come to the foreground! -- Loading async storage into context',
  //       );
  //       readData();
  //     }

  //     appState.current = nextAppState;
  //     // setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    <LanguageObjectContext.Provider value={{languageObj, setLanguageObj}}>
      <LanguageScreen />
    </LanguageObjectContext.Provider>
  );
};

export default App;
