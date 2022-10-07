/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import LanguageObjectContext from './contexts/LanguageObject';
import LanguageScreen from './screens/LanguageScreen';
// import Navigation from './screens/Navigation/Navigation';
// import UserContext from './contexts/User';

const languageObject = {
  language: 'Spanish',
  words: {
    "baja": 'down',
    "cerrado": 'closed',
    "afuera": 'outside',
  },
};

const App = () => {
  const [languageObj, setLanguageObj] = useState(languageObject);

  return (
    <LanguageObjectContext.Provider value={{languageObj, setLanguageObj}}>
      <LanguageScreen />
    </LanguageObjectContext.Provider>
  );
};

export default App;
