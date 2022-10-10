import React, {useState, useContext, createContext, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  SectionList,
  StatusBar,
} from 'react-native';
import {TextInput, Button, Searchbar} from 'react-native-paper';
import LanguageObjectContext from '../contexts/LanguageObject';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({navigation}) => {
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);

  const clearAllData = async () => {
    let didUserConfirm = false;
    Alert.alert('CLEAR ALL DATA', 'ARE YOU SURE?', [
      {
        text: 'Cancel',
        onPress: () => (didUserConfirm = false),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => (didUserConfirm = true),
        style: 'destructive',
      },
    ]);
    if (didUserConfirm) {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        // clear error
        console.log('clear storage threw error ' + e);
        throw e;
      }

      console.log('Done.');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
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
    backgroundColor: Colors.LIGHT_PURPLE,
    // padding: 1,
    // paddingBottom: 10,
  },
  clearButton: {
    backgroundColor: Colors.LIGHT_RED,
    borderRadius: 12,
    width: 200,
    alignSelf: 'center',
    margin: 10,
  },
});

export default SettingsScreen;
