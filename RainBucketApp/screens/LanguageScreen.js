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

const ListOfWordsEx = langWords => {
  // Below is a completely working section list render example
  const animals = [
    {id: 1, animal: 'Dog'},
    {id: 2, animal: 'Bird'},
    {id: 3, animal: 'Cat'},
    {id: 4, animal: 'Mouse'},
    {id: 5, animal: 'Horse'},
  ];
  console.log(animals[0]); //works!
  console.log(animals[4].animal); //works!
  let a = animals.filter(item => item.animal.includes('e')); //.map(i => i.animal);
  console.log(a);
  let list = ['b', 'c', 'd'];
  console.log(list[0]); // works!

  let sectionL = [
    {
      title: 'Yet to B alphabetized',
      data: a,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionL}
        renderItem={({item}) => <Text style={styles.item}>{item.animal}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item.id}`}
      />
    </View>
  );
};

const ListOfWords = langWords => {
  let a = langWords.langWords.filter(i => i.word.charAt(0) === 'a');
  let b = langWords.langWords.filter(i => i.word.charAt(0) === 'b');
  let c = langWords.langWords.filter(i => i.word.charAt(0) === 'c');
  let g = langWords.langWords.filter(i => i.word.charAt(0) === 'g');

  //Section gameplan:
  // List of alphabet characters (oo including spanish characters??)
  // for each letter, do the filter charAt
  // if resulting list is not empty
  // create a new section object with title = letter and data = list
  // add section object to section array
  // pass section array to SectionList component

  // let sectionL = [
  //   {
  //     title: 'A',
  //     data: a,
  //   },
  //   {
  //     title: 'B',
  //     data: b,
  //   },
  //   {
  //     title: 'C',
  //     data: c,
  //   },
  //   {
  //     title: 'G',
  //     data: g,
  //   },
  // ];

  const sorted = langWords.langWords.sort((a, b) => (a.word > b.word ? 1 : -1));

  const sectionL = [
    {
      title: 'Spanish Words',
      data: sorted,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionL}
        renderItem={({item}) => (
          <Text style={styles.item}>
            {item.word} - {item.definition}
          </Text>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item.id}`}
      />
    </View>
  );
};

const LanguageScreen = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  // const [lang, setLang] = useState('');
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);

  this.wordInput = React.createRef();
  this.definitionInput = React.createRef();

  const handleAddWord = () => {
    if (word !== '' && definition !== '') {
      const newWordItem = {
        id: languageObj.words.length + 1,
        word,
        definition,
      };
      const newLOW = languageObj.words;
      newLOW.push(newWordItem);
      setLanguageObj({...languageObj, words: newLOW});
      console.log(JSON.stringify(languageObj.words, undefined, 2));

      this.wordInput.current.clear();
      this.definitionInput.current.clear();
      setWord('');
      setDefinition('');
    } else {
      console.log('Nothing to add');
    }
  };

  const wordInputLabel = 'New ' + languageObj.language + ' word';
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* <ScrollView style={styles.screenContainer}> */}
      <Text style={styles.text}>{languageObj.language} Screen!</Text>
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
      <ListOfWords langWords={languageObj.words} />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default LanguageScreen;
