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
import SelectedItemContext from '../contexts/SelectedItem';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Item format as it comes from Add: {id: '0 word', word: '', definition: ''}

const EditWordScreen = ({navigation}) => {
  //   const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);
  const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>Edit {selectedItem.word}</Text>
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
});

export default EditWordScreen;
