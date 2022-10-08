import React, {useState, useContext, createContext, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  SectionList,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import LanguageObjectContext from '../contexts/LanguageObject';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  input: {
    margin: 10,
  },
  text: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
  },
  clearButton: {
    backgroundColor: Colors.LIGHT_RED,
    borderRadius: 12,
    width: 200,
    alignSelf: 'center',
    margin: 10,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SetOfLanguagesScreen = ({navigation}) => {
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
      console.log('clear storage threw error ' + e);
      throw e;
    }

    console.log('Done.');
  };

  const readData = async language => {
    try {
      const value = await AsyncStorage.getItem(language);
      console.log('(App.readData) value:' + value);
      if (value !== null) {
        setLanguageObj({language: language, words: JSON.parse(value)});
      } else {
        console.log(
          '(App.readData).getItem value is null! create a new ' +
            language +
            ' object',
        );
        const newLanguage = {
          language: language,
          words: [{id: 0, word: '', definition: ''}],
        };
        setLanguageObj(newLanguage);
      }
    } catch (e) {
      console.log(
        '(App.readData) Failed to fetch the input from storage: ' + e,
      );
      throw e;
    }
  };

  const handleLanguageSelection = language => {
    readData(language);
    navigation.navigate('LanguageScreen');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.text}>Choose a languague!</Text>
      <TouchableOpacity onPress={() => handleLanguageSelection('Spanish')}>
        <Text style={styles.text}>Spanish</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLanguageSelection('Japanese')}>
        <Text style={styles.text}>Japanese</Text>
      </TouchableOpacity>
      <Button
        style={styles.clearButton}
        textColor={Colors.TEST_CREAM}
        onPress={() => clearAllData()}>
        CLEAR STORAGE
      </Button>
    </SafeAreaView>
  );
};

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default SetOfLanguagesScreen;
