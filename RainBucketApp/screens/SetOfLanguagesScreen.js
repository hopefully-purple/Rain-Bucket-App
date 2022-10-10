import React, {useContext} from 'react';
import {Text, SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import LanguageObjectContext from '../contexts/LanguageObject';
import Colors from '../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SetOfLanguagesScreen = ({navigation}) => {
  const {languageObj, setLanguageObj} = useContext(LanguageObjectContext);

  const readData = async language => {
    try {
      const value = await AsyncStorage.getItem(language);
      // console.log('(App.readData) value:' + value);
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
          words: [{id: '0', word: '', definition: ''}],
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
      <Text style={styles.titleText}>Choose a language!</Text>
      <TouchableOpacity onPress={() => handleLanguageSelection('Spanish')}>
        <Text style={styles.languageText}>Spanish</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleLanguageSelection('Japanese')}>
        <Text style={styles.languageText}>Japanese</Text>
      </TouchableOpacity>
      <View styles={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/ORIGpurple_rainbucket_2.jpeg')}
        />
        <Text
          style={styles.logoText}
          onPress={() => navigation.navigate('Settings')}>
          Rainbucket App
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  titleText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 25,
    margin: 10,
    padding: 5,
    backgroundColor: Colors.LIGHT_PURPLE,
  },
  languageText: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
    // backgroundColor: Colors.LIGHT_PURPLE,
  },
  logoContainer: {
    // margin: 100,
  },
  logo: {
    height: 300,
    marginTop: 100,
    alignSelf: 'center',
  },
  logoText: {
    color: Colors.TEST_PURPLE,
    fontSize: 25,
    margin: 10,
    padding: 5,
    alignSelf: 'center',
  },
});

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default SetOfLanguagesScreen;
