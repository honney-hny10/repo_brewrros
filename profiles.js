import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import prof from './profile1.png';

const Stack = createStackNavigator();

const Profiles = ({ navigation }) => {
  const options = [
    { id: '1', title: 'Address' },
    { id: '2', title: 'BPAY' },
    { id: '3', title: 'Help' },
    { id: '4', title: 'Logout' },
  ];

  const handlePress = (title) => {
    if (title === 'Logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', onPress: () => navigation.navigate('GettingStarted') },
        ],
        { cancelable: true }
      );
    } else {
        Alert.alert(title, 'Unfortunately we couldnot make more screens hehe <3.Enjoy your time surfing through our App!');

    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={prof}
        style={styles.image}
      />
       < View>
          <Text  style={styles.title1}>Welcome !</Text>
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option} onPress={() => handlePress(item.title)}>
            <View style={styles.optionContent}>
              <Text style={styles.optionText}>{item.title}</Text>
              <Icon name="chevron-forward-outline" size={24} color="#482e1d" />
            </View>
            </TouchableOpacity>
           
        )}
      />
      </View>
   </View>
  );
};

const GettingStarted = () => (
  <View style={styles.center}>
    <Text style={styles.title}>Welcome!</Text>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="GettingStarted" component={GettingStarted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius:150,
    borderTopRadius:50,
       alignSelf: 'center',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#482e1d',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  
  },
  optionText: {
    fontSize: 18,
    color:'#482e1d'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title1:{
   fontSize:28,
   fontWeight:'bold',
   color:'#482e1d',
   alignSelf:'center',
   marginHorizontal:30,
  }
});

export default Profiles;
