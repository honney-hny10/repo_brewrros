import { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import brew from './brewrros.jpeg';
import MenuCard from './MenuCard';
import OrdersPage from './OrdersPage';
import OfferScreen from './OffersScreen';
import Profiles from './profiles';
import CartPage from './CartPage';
import { CartProvider } from './CartPage';
import { CategoryProvider } from './CategoryContext';
import memo4 from './memo4.png';

//getting started
function GettingStarted({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image source={brew} style={styles.heroImage} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.titles}>
            Welcome{'\n\n'}to{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>Brewrros</Text>
            </View>
          </Text>
          <Text style={styles.text}>
            Grab some crispy chhuros in their best tint of cinnamon along with
            brewed coffee beans that soothe the day!
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Right here!</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  const images = [
    'https://wallpaperaccess.com/full/1320593.jpg',
    'https://lh7-us.googleusercontent.com/5IFXlx7Geaw_bikeVDsFUgq0k4B5MAHZgqRhpIdhQug9691wOfLIwXAkirY_staWqRxzT1GGSGiv30xtGx9XoJufEkeytZWaqRghZD29qNSoM60tLsnbZvm6-5Tuza05Qmu5bJBmY0_-Owiadvh9WMI',
    'https://i.pinimg.com/originals/1b/3e/de/1b3ede369c112797f86cc3cc0319f81c.jpg',
    'https://wallpaperaccess.com/full/3455920.jpg',
    'https://www.lugaris.com/app/uploads/2020/06/churros-1.jpg',
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#F0DAAE' }}>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <View style={{ width: 350, height: 220, margin: 14 }}>
              <Image
                source={{ uri: item }}
                style={{ width: 370, height: 230, borderRadius: 10 }}
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <MenuCard />
        </ScrollView>
        <View>
          <Text
            style={{
              fontSize: 24,
              color: '#895D2B',
              fontWeight: 'bold',
              marginHorizontal: 7,
              marginBottom: 5,
              alignSelf: 'center',
              marginTop: 0,
            }}>
            {' '}
            BARISTA BRINGS YOU:{' '}
          </Text>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Offers')}>
              <Image
                source={memo4}
                style={{
                  width: 370,
                  height: 270,
                  marginBottom: 5,
                  paddingTop: 5,
                  marginLeft: 10,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function CartScreen() {
  return <CartPage />;
}

function OffersScreen() {
  return <OfferScreen />;
}

function OrdersScreen() {
  return (
    <View>
      <OrdersPage />
    </View>
  );
}

function ProfileScreen() {
  return <Profiles />;
}

//sign up
function Signup({ navigation }) {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');

  const handleSignup = async () => {
    if (signupEmail && signupPassword && signupUsername) {
      try {
        const user = {
          email: signupEmail,
          password: signupPassword,
          username: signupUsername,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate('Signin');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
      }
    } else {
      Alert.alert('Error', 'All fields are required!');
    }
  };

  return (
    <View style={styles.containers}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={signupUsername}
        onChangeText={setSignupUsername}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={signupEmail}
        onChangeText={setSignupEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={signupPassword}
        onChangeText={setSignupPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Sign Up" color="#482E1D" onPress={handleSignup} />
        </View>
      </View>
    </View>
  );
}

//sign in
function Signin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    if (email && password) {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          if (userData.email === email && userData.password === password) {
            navigation.replace('Main');
          } else {
            Alert.alert('Error', 'Invalid email or password!');
          }
        } else {
          Alert.alert('Error', 'User not found!');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
      }
    } else {
      Alert.alert('Error', 'All fields are required!');
    }
  };

  return (
    <View style={styles.containers}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Sign In" color="#482E1D" onPress={handleSignin} />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

//material bottom
const Tab = createMaterialBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator shifting={false} barStyle={{ backgroundColor: '#482E1D' }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color="#F0DAAE" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarLabel: 'Offers',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift" color="#F0DAAE" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              color="#F0DAAE"
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color="#F0DAAE" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color="#F0DAAE" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//drawer
const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#DFD0BB',
        },
        headerStyle: {
          backgroundColor: '#482E1D',
        },
        headerTintColor: '#F0DAAE',
        drawerActiveTintColor: '#CC7952',
        drawerInactiveTintColor: 'black',
      }}>
      <Drawer.Screen name="Home" component={MainTabs} />
      <Drawer.Screen name="Saved Orders" component={OrdersScreen} />
      <Drawer.Screen name="Offers" component={OffersScreen} />
      <Drawer.Screen
        name="Logout"
        component={() => {
          return <GettingStarted />;
        }}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

//stack for authentication and main app
const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="GettingStarted" component={GettingStarted} />
      <AuthStack.Screen name="Signin" component={Signin} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}

//main app
export default function App() {
  return (
    <CategoryProvider>
      <CartProvider>
        <PaperProvider>
          <NavigationContainer>
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
              <AuthStack.Screen name="Auth" component={AuthStackNavigator} />
              <AuthStack.Screen name="Main" component={MainDrawer} />
            </AuthStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </CartProvider>
    </CategoryProvider>
  );
}

//styles
const styles = StyleSheet.create({
  //main page
  container: {
    flex: 1,
    backgroundColor: '#3C2712',
  },
  titles: {
    fontSize: 28,
    fontWeight: '500',
    color: '#F0DAAE',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#F0DAAE',
    textAlign: 'center',
  },
  hero: {
    backgroundColor: '#3C2712',
    margin: 12,
    borderRadius: 16,
    padding: 16,
    marginTop: 50,
  },
  heroImage: {
    width: '100%',
    height: 400,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '#F0DAAE',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#482E1D',
  },
  // main app button
  button: {
    backgroundColor: '#A3966A',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
  // login signup container
  containers: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F0DAAE',
  },
  // login signup styles
  title: {
    fontSize: 40,
    color: '#895D2B',
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: '#A3966A',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    paddingLeft: 12,
    backgroundColor: '#A3966A',
    paddingBottom: 10,
    width: '70%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '30%',
    borderRadius: 10,
    paddingTop: 8,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  signupText: {
    color: '#482E1D',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  menuContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
