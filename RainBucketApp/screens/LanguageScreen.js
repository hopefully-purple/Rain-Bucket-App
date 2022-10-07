import React, {useState, useContext, createContext, useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import LanguageObjectContext from '../contexts/LanguageObject';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  input: {
    margin: 10,
  },
  text: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
  },
  addButton: {
    backgroundColor: Colors.LIGHT_PURPLE,
    borderRadius: 12,
    width: 100,
    alignSelf: 'center',
    margin: 10,
  },
});

// const languageObject = {
//   language: '',
//   words: {},
// };

//store a dictionary of languages asyncKey = langDict asyncValue = array of languages

const LanguageScreen = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  // const [lang, setLang] = useState('');
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);

  const handleAddWord = () => {
    // languageObj.words[word] = definition;
    console.log(JSON.stringify(languageObj.words, undefined, 2));
  };

  const wordInputLabel = 'New ' + languageObj.language + ' word';
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.text}>{languageObj.language} Screen!</Text>
        <TextInput
          label={wordInputLabel}
          value={word}
          onChangeText={text => setWord(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={Colors.TEST_PURPLE}
          autoCorrect={false}
        />
        <TextInput
          label="Definition"
          value={definition}
          onChangeText={text => setDefinition(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={Colors.TEST_PURPLE}
          autoCorrect={false}
        />
        <Button
          mode="elevated"
          style={styles.addButton}
          onPress={handleAddWord}>
          Add!
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default LanguageScreen;
