import React, {useState, useContext, createContext, useEffect} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import LanguageObjectContext from '../contexts/LanguageObject';
import SelectedItemContext from '../contexts/SelectedItem';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Item format as it comes from Add: {id: '0 word', word: '', definition: ''}

const EditWordScreen = ({navigation}) => {
  //   const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);
  const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);

  const [word, setWord] = useState(selectedItem.word);
  const [pronunciation, setPron] = useState('');
  const [definition, setDefinition] = useState(selectedItem.definition);
  const [notes, setNotes] = useState('');

  const [defHeight, setDefHeight] = useState(0);

  const handleSave = () => {
    console.log('New stuff:');
    console.log(word);
    console.log(pronunciation);
    console.log(definition);
    console.log(notes);
    //if (word !== '' && definition !== '') {
    //   // console.log(
    //   //   '(handleaddword) languageObj.words.length=' + languageObj.words.length,
    //   // );
    //   let newID = languageObj.words.length + 1;
    //   //Create word object
    //   const newWordItem = {
    //     id: newID + ' ' + word,
    //     word,
    //     definition,
    //   };
    //   //console.log('(handleAddWord) newWordItem.id=' + newWordItem.id);

    //   //Update languageObj context
    //   const newLOW = languageObj.words;
    //   newLOW.push(newWordItem);
    //   const sortedNL = newLOW.sort((a, b) => (a.word > b.word ? 1 : -1));
    //   //console.log('(handleAddWord) SortedNL:');
    //   //console.log(JSON.stringify(sortedNL, undefined, 2));
    //   setLanguageObj({...languageObj, words: sortedNL});
    //   // console.log(JSON.stringify(languageObj.words, undefined, 2));

    //   //Clear inputs
    //   this.wordInput.current.clear();
    //   this.definitionInput.current.clear();
    //   setWord('');
    //   setDefinition('');

    //   //Save to async storage
    //   saveData();
    // } else {
    //   console.log('Nothing to add');
    // }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <TextInput
        style={styles.wText}
        value={word}
        onChangeText={text => setWord(text)}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit="true"
        // onSubmitEditing={something}
        // ref={this.wordInput}
      />
      <TextInput
        style={styles.prText}
        placeholder="add pronunciation"
        value={pronunciation}
        onChangeText={text => setPron(text)}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit="true"
        // onSubmitEditing={something}
        // ref={this.wordInput}
      />
      <TextInput
        value={definition}
        multiline="true"
        onChangeText={text => setDefinition(text)}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit="true"
        onContentSizeChange={event => {
          setDefHeight(event.nativeEvent.contentSize.height);
        }}
        style={{...styles.dText, height: Math.max(70, defHeight)}}
        // onSubmitEditing={something}
        // ref={this.wordInput}
      />
      <Text style={styles.otherText}>Notes:</Text>
      <TextInput
        style={styles.otherText}
        value={notes}
        onChangeText={text => setNotes(text)}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit="true"
        // onSubmitEditing={something}
        // ref={this.wordInput}
      />
      <Text style={styles.otherText}>Tags:</Text>
      <Text style={styles.otherText}>Look up in dictionary?</Text>
      <Button mode="elevated" style={styles.saveButton} onPress={handleSave}>
        Save changes
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
  wText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  prText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 15,
    fontStyle: 'italic',
    margin: 20,
  },
  dText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    marginHorizontal: 20,
    textAlignVertical: 'top',
    textAlign: 'left',
    // height: 70,
    width: 380,
    flexWrap: 'wrap',
    // inlineSize: 'min-content',
    // overflowWrap: 'break-word',s
    // overflow: 'scroll',
  },
  otherText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: Colors.LIGHT_PURPLE,
    borderRadius: 12,
    width: 190,
    alignSelf: 'center',
    margin: 20,
  },
});

export default EditWordScreen;
