/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
  FlatList,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Contacts from 'react-native-contacts';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [localContacts, setLocalContacts] = useState([]); // initialise empty contacts array

  const getContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissions Granted to Contacts');
        Contacts.getAll().then(contacts => {
          // contacts returned
          console.log(contacts);
          setLocalContacts(contacts);
        });
      } else {
        console.log('Permissions Denied to Contacts');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(async () => {
    getContacts();
  }, []);

  const Item = ({
    email,
    company,
    department,
    emailAddresses,
    givenName,
    familyName,
    middleName,
    note,
    phoneNumbers,
    recordID,
    hasThumbnail,
    imAddresses,
    jobTitle,
    thumbnailPath,
    displayName,
  }) => {
    return (
      <View>
        <Text>{displayName}</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    console.log(item);
    const {givenName, displayName} = item;
    console.log(givenName);
    return <Item givenName={givenName} displayName={displayName} />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {localContacts.length >= 1 ? (
        <FlatList
          data={localContacts}
          renderItem={renderItem}
          keyExtractor={item => item.recordID}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
