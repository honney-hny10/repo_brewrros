import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from './CategoryContext';

const MenuCard = () => {
  const navigation = useNavigation();
  const { setSelectedCategory } = useCategory();

  const handlePress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('Orders');
  };

  return (
    <View style={styles.ordercontainer}>
      <Text style={styles.ordertitle}>Our Menu</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.ordermenuItemsContainer}>
          <TouchableOpacity 
            style={styles.ordermenuItem}
            onPress={() => handlePress('hot brew')}
          >
            <Image
              style={styles.orderimage}
              source={{
                uri: 'https://images.pexels.com/photos/682503/pexels-photo-682503.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
              }}
            />
            <Text style={styles.ordermenuText}>Hot Brews</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.ordermenuItem}
            onPress={() => handlePress('cold brew')}
          >
            <Image
              style={styles.orderimage}
              source={{
                uri: 'https://thumbs.dreamstime.com/b/splash-glass-ice-coffee-dark-background-refreshing-iced-cappuccino-drink-ice-cubes-wave-cold-drink-splash-169474943.jpg',
              }}
            />
            <Text style={styles.ordermenuText}>Cold Brews</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.ordermenuItem}
            onPress={() => handlePress('combos')}
          >
            <Image
              style={styles.orderimage}
              source={{
                uri: 'https://img.freepik.com/premium-photo/churros-hot-chocolate-black-background-generative-ai_74760-1964.jpg',
              }}
            />
            <Text style={styles.ordermenuText}>Best of Combos</Text>
            <Text style={styles.ordermenuText}>upto 20% off</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.ordermenuItem}
            onPress={() => handlePress('churros')}
          >
            <Image
              style={styles.orderimage}
              source={{ uri: 'https://img.freepik.com/premium-photo/falling-churros-with-side-chocolate-ai-generative_1038838-12173.jpg' }}
            />
            <Text style={styles.ordermenuText}>Churros</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.ordermenuItem}
            onPress={() => handlePress('ReadyBling')}
          >
            <Image
              style={styles.orderimage}
              source={{ uri: 'https://img.freepik.com/premium-photo/bag-coffee-beans-cup-coffee_962508-6110.jpg' }}
            />
            <Text style={styles.ordermenuText}>Ready Blings!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ordercontainer: {
    paddingVertical: 8,
  },
  ordertitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#895d2b',
    textAlign: 'center',
    marginBottom: 8,
  },
  ordermenuItemsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  ordermenuItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  orderimage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 8,
  },
  ordermenuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MenuCard;
