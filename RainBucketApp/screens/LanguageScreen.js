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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SPANISH} from '../assets/alphabets/Alphabets';

// Packages to consider in place of doing by hand:
// https://npm.io/package/rn-alphabet-section-list
function organizeIntoAlphabetizedSections(langObj) {
  //Section gameplan:
  if (langObj.language !== 'Spanish') {
    const newS = [
      {
        title: 'Words',
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
        i.word.charAt(0).toUpperCase() === letter ||
        (i.word.charAt(0) === '¡' &&
          i.word.charAt(1).toUpperCase() === letter) ||
        (i.word.charAt(0) === '¿' && i.word.charAt(1).toUpperCase() === letter),
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
  // console.log('(organize) resulting newSL:');
  // console.log(JSON.stringify(newSL, undefined, 2));
  // pass section array to SectionList component
  return newSL;
}

const ListOfWords = ({sectionL, nav}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionL}
        renderItem={({item}) => <Item item={item} nav={nav} />}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${item.id}`}
      />
    </SafeAreaView>
  );
};

const Item = ({item, nav}) => {
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);
  const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);

  function deleteItemInWords() {
    // Filter condition
    function excludeItem(i) {
      return i.id !== item.id;
    }
    const words = languageObj.words.filter(excludeItem);
    // console.log(words);
    setLanguageObj({...languageObj, words: words});
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(languageObj.language, JSON.stringify(words));
        console.log('(saveData) Data successfully saved');
      } catch (e) {
        console.log('(saveData) Failed to save the data to the storage');
        throw e;
      }
    };

    saveData();
  }

  const changeItemAlert = () =>
    Alert.alert(item.word, item.definition, [
      {
        text: 'Edit',
        onPress: () => {
          setSelectedItem(item);
          nav.navigate('EditingScreen');
        },
      },
      {
        text: 'Delete',
        onPress: () => deleteItemInWords(),
      },
      {text: 'Done', onPress: () => console.log('Done Pressed')},
    ]);

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => changeItemAlert()}>
        <Text style={styles.itemWord}>{item.word}</Text>
        <Text style={styles.itemDefinition}> - {item.definition}</Text>
      </TouchableOpacity>
    </View>
  );
};

const LanguageScreen = ({navigation}) => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);
  // const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);

  this.searchInput = React.createRef();
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
        pronun: '',
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
      // console.log(JSON.stringify(languageObj.words, undefined, 2));

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
      if (searchQuery === '') {
        const newSectionL = organizeIntoAlphabetizedSections(languageObj);
        setSectionList(newSectionL);
      }
    },
    [languageObj, searchQuery],
  );

  const createSearchSectionList = query => {
    // Filter languagObj.words on .word
    let searchList = languageObj.words.filter(
      i =>
        i.word.toLowerCase().includes(query.toLowerCase()) ||
        i.definition.toLowerCase().includes(query.toLowerCase()),
    );
    // Set resulting array to section list
    // console.log(JSON.stringify(searchList, undefined, 2));
    const newS = [
      {
        title: 'Words including ' + query,
        data: searchList,
      },
    ];
    return newS;
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    // console.log(searchQuery);
    setSectionList(createSearchSectionList(query));
  };

  const onSubmitSearch = () => {
    this.searchInput.current.blur();
  };

  const wordInputLabel = 'New ' + languageObj.language + ' word/phrase';
  return (
    <SafeAreaView
      style={styles.screenContainer}
      onTouchStart={() => {
        this.searchInput.current.blur();
        this.wordInput.current.blur();
        this.definitionInput.current.blur();
      }}>
      <View style={styles.screenTop}>
        <TouchableOpacity
          style={styles.titleTouchable}
          onPress={() => navigation.navigate('SetOfLanguages')}>
          <Text style={styles.text}>{languageObj.language} Screen!</Text>
        </TouchableOpacity>
        <TextInput
          label="Search"
          mode="outlined"
          dense="true"
          blurOnSubmit="true"
          activeOutlineColor={Colors.TEST_PURPLE}
          value={searchQuery}
          autoCorrect={false}
          autoCapitalize={false}
          onChangeText={onChangeSearch}
          onSubmitEditing={onSubmitSearch}
          style={styles.searchBar}
          left={<TextInput.Icon icon="magnify" color={Colors.TEST_PURPLE} />}
          ref={this.searchInput}
        />
      </View>
      <TextInput
        label={wordInputLabel}
        value={word}
        onChangeText={text => setWord(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.TEST_PURPLE}
        autoCorrect={false}
        autoCapitalize={false}
        blurOnSubmit="true"
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
        blurOnSubmit="true"
        ref={this.definitionInput}
      />
      <Button mode="elevated" style={styles.addButton} onPress={handleAddWord}>
        Add!
      </Button>
      <ListOfWords sectionL={sectionList} nav={navigation} />
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
  titleTouchable: {
    // margin: 1,
  },
  text: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
    backgroundColor: Colors.LIGHT_PURPLE,
    // padding: 1,
    // paddingBottom: 10,
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
    flexDirection: 'row',
    paddingTop: 10,
    // marginRight: 10,
  },
  itemWord: {
    // padding: 10,
    fontSize: 18,
    height: 44,
    // backgroundColor: Colors.LIGHT_PURPLE,
    color: Colors.TEST_PURPLE,
    // borderColor: Colors.BRIGHT_RED,
    // borderWidth: 1,
    // flexWrap: 'wrap', //does nothing
  },
  itemDefinition: {
    // paddingRight: 5,
    // marginRight: 5,
    fontSize: 18,
    height: 44,
    // overflow: 'scroll',
    // overflow: 'hidden',
    // flexWrap: 'nowrap', //does nothing
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  screenTop: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchBar: {
    width: 100,
    // height: 20,
    flexGrow: 1,
    // flexShrink: 1,
    marginRight: 10,
  },
});

export default LanguageScreen;
