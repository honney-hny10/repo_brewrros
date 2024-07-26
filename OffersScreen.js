import React, { useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, FlatList, Image } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');
const ITEM_SIZE = windowHeight * 0.7;

const data = [
  { image: require('./memo3.png') },
  { image: require('./memo2.png') },
  { image: require('./memo5.jpg')},
  { image: require('./memo1.png') },
  { image: require('./memo.png') },

];

const OffersScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [
      -1,
      0,
      index * ITEM_SIZE,
      (index + 2) * ITEM_SIZE,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });

    return (
      <CardComponent
        imageSource={item.image}
        style={{ transform: [{ scale }] }}
      />
    );
  };

  const keyExtractor = (_, index) => index.toString();

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const CardComponent = ({ imageSource, style }) => {
  return (
    <Animated.View style={[styles.card, style]}>
      <Image source={imageSource} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F0DAAE',
  },
  card: {
    backgroundColor: '#482E1D',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: '100%', height: '50%' },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    padding: 0,
    alignItems: 'center',
    width: 352,
    height: 250,
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default OffersScreen;
