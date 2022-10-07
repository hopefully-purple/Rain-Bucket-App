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

const getLanguageObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Spanish');
    console.log('get async jsonValue=' + jsonValue);
    return new Promise((resolve, reject) => {
      if (jsonValue != null) {
        resolve(JSON.parse(jsonValue));
      } else {
        reject(languageObject);
      }
    });
  } catch(e) {
    // read error
    console.log('Async storage threw an error when getting: ' + e);
    throw e;
  }
};

const setLanguageObject = async (languageObject) => {
  try {
    const jsonValue = JSON.stringify(languageObject);
    await AsyncStorage.setItem(languageObject.language, jsonValue);
  } catch(e) {
    // save error
    console.log('Async storage threw an error when setting: ' + e);
    throw e;
  }

  console.log('Async set Done.');
};

const App = () => {
  const [languageObj, setLanguageObj] = useState(languageObject);
  const appState = useRef(AppState.currentState);
  // Set langobj to Async storage contents!!
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log(
          'App has come to the foreground! -- Loading async storage into context',
        );
        async function fetchLanguageData() {
          const response = await getLanguageObject();
          response.then((asyncLO) => {
            console.log('Below is the json object we get in response');
            console.log(JSON.stringify(asyncLO, undefined, 2));
            // console.log('Hopefully updates context?');
            // setLanguageObj(response);
            // console.log('Print new context?');
            // console.log(JSON.stringify(languageObj, undefined, 2));
          });
        }
        fetchLanguageData();
      } else if (appState.current.match(/inactive|background/)) {
        console.log('App is inactive or in background -- Update async with context');
        async function setLanguageData() {
          await setLanguageObject(languageObj);
          // const r = await getLanguageObject();
          console.log('line after set await');
        }
        setLanguageData();
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [languageObj]);
  return (
    <LanguageObjectContext.Provider value={{languageObj, setLanguageObj}}>
      <LanguageScreen />
    </LanguageObjectContext.Provider>
  );
};

export default App;
