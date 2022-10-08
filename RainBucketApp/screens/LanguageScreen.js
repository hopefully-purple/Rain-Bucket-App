import React, {useState, useContext, createContext, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  SectionList,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import LanguageObjectContext from '../contexts/LanguageObject';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SPANISH} from '../assets/alphabets/Alphabets';

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
  addButton: {
    backgroundColor: Colors.LIGHT_PURPLE,
    borderRadius: 12,
    width: 100,
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
    // backgroundColor: Colors.LIGHT_PURPLE,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

// Packages to consider in place of doing by hand:
// https://npm.io/package/rn-alphabet-section-list
function organizeIntoAlphabetizedSections(langObj) {
  //Section gameplan:
  if (langObj.language !== 'Spanish') {
    const newS = [
      {
        title: 'Words',
        // data: sorted,
        data: langObj.words,
      },
    ];
    return newS;
  }
  // List of alphabet characters (oo including spanish characters??)
  // for each letter, do the filter charAt
  let newSL = [];
  for (let letter of SPANISH) {
    let section = langObj.words.filter(
      i =>
        i.word.charAt(0) === letter ||
        (i.word.charAt(0) === '¡' && i.word.charAt(1) === letter) ||
        (i.word.charAt(0) === '¿' && i.word.charAt(1) === letter),
    );
    if (section.length > 0) {
      // create a new section object with title = letter and data = list
      const newS = {
        title: letter,
        data: section,
      };
      // add section object to section array
      newSL.push(newS);
    }
  }
  console.log('(organize) resulting newSL:');
  console.log(JSON.stringify(newSL, undefined, 2));
  // pass section array to SectionList component
  return newSL;
}

const ListOfWords = ({sectionL, langObj, setLanguageObj}) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionL}
        // renderItem={({item}) => (
        //   <Text style={styles.item}>
        //     {item.word} - {item.definition}
        //   </Text>
        // )}
        renderItem={({item}) => (
          <Item item={item} langObj={langObj} setLanguageObj={setLanguageObj} />
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item.id}`}
      />
    </View>
  );
};

const Item = ({item, langObj, setLanguageObj}) => (
  <TouchableOpacity
    onLongPress={() => changeItemAlert(item, langObj, setLanguageObj)}>
    <Text style={styles.item}>
      {item.word} - {item.definition}
    </Text>
  </TouchableOpacity>
);

const changeItemAlert = (item, langObj, setLanguageObj) =>
  Alert.alert(item.word, item.definition, [
    {
      text: 'Edit',
      onPress: () => console.log('Edit Pressed'),
    },
    {
      text: 'Delete',
      // onPress: () => console.log('Delete ' + item.id + ' Pressed'),
      onPress: () => deleteItemInWords(item.id, langObj, setLanguageObj),
    },
    {text: 'Done', onPress: () => console.log('Done Pressed')},
  ]);

function deleteItemInWords(id, langObj, setLanguageObj) {
  function getItem(item) {
    return item.id !== id;
  }
  const words = langObj.words.filter(getItem);
  console.log(words);
  setLanguageObj({...langObj, words: words});
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(langObj.language, JSON.stringify(words));
      console.log('(saveData) Data successfully saved');
    } catch (e) {
      console.log('(saveData) Failed to save the data to the storage');
      throw e;
    }
  };

  saveData();
}

const LanguageScreen = ({navigation}) => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);

  this.wordInput = React.createRef();
  this.definitionInput = React.createRef();

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        languageObj.language,
        JSON.stringify(languageObj.words),
      );
      console.log('(saveData) Data successfully saved');
    } catch (e) {
      console.log('(saveData) Failed to save the data to the storage');
      throw e;
    }
  };

  const handleAddWord = () => {
    if (word !== '' && definition !== '') {
      // console.log(
      //   '(handleaddword) languageObj.words.length=' + languageObj.words.length,
      // );
      let newID = languageObj.words.length + 1;
      //Create word object
      const newWordItem = {
        id: newID + ' ' + word,
        word,
        definition,
      };
      //console.log('(handleAddWord) newWordItem.id=' + newWordItem.id);

      //Update languageObj context
      const newLOW = languageObj.words;
      newLOW.push(newWordItem);
      const sortedNL = newLOW.sort((a, b) => (a.word > b.word ? 1 : -1));
      //console.log('(handleAddWord) SortedNL:');
      //console.log(JSON.stringify(sortedNL, undefined, 2));
      setLanguageObj({...languageObj, words: sortedNL});
      console.log(JSON.stringify(languageObj.words, undefined, 2));

      //Clear inputs
      this.wordInput.current.clear();
      this.definitionInput.current.clear();
      setWord('');
      setDefinition('');

      //Save to async storage
      saveData();
    } else {
      console.log('Nothing to add');
    }
  };

  const [sectionList, setSectionList] = useState([]);
  useEffect(
    function createSectionList() {
      // console.log('(LS.createSectionList) how often is useEffect called?');
      // const sorted = languageObj.words.sort((a, b) =>
      //   a.word > b.word ? 1 : -1,
      // );

      const newSectionL = organizeIntoAlphabetizedSections(languageObj);
      setSectionList(newSectionL);
    },
    [languageObj],
  );

  const wordInputLabel = 'New ' + languageObj.language + ' word/phrase';
  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('SetOfLanguages')}>
        <Text style={styles.text}>{languageObj.language} Screen!</Text>
      </TouchableOpacity>
      <TextInput
        label={wordInputLabel}
        value={word}
        onChangeText={text => setWord(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.TEST_PURPLE}
        autoCorrect={false}
        autoCapitalize={false}
        ref={this.wordInput}
      />
      <TextInput
        label="Definition"
        value={definition}
        onChangeText={text => setDefinition(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.TEST_PURPLE}
        autoCapitalize={false}
        autoCorrect={false}
        ref={this.definitionInput}
      />
      <Button mode="elevated" style={styles.addButton} onPress={handleAddWord}>
        Add!
      </Button>
      <ListOfWords
        sectionL={sectionList}
        langObj={languageObj}
        setLanguageObj={setLanguageObj}
      />
    </SafeAreaView>
  );
};

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default LanguageScreen;
