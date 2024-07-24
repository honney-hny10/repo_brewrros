import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useCategory } from './CategoryContext';


const ColdbrewData = [
  {
    "id": 1,
    "title": "Classic Cold Brew",
    "price": 4.50,
    "category": "cold brew",
    "description": "A smooth, rich cold brew made from premium beans, perfect for a refreshing coffee experience.",
    "image": "https://th.bing.com/th/id/OIP.9FfAAxYZHgbJGDMRlX-WdgHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "rating": {
      "rate": 4.7,
      "count": 150
    }
  },
  {
    "id": 2,
    "title": "Vanilla Sweet Cream Cold Brew",
    "price": 5.00,
    "category": "cold brew",
    "description": "A classic cold brew with a hint of vanilla, topped with sweet cream for a smooth finish.",
    "image": "https://midwestniceblog.com/wp-content/uploads/2022/09/starbucks-copycat-vanilla-sweet-cream-cold-brew.jpg",
    "rating": {
      "rate": 4.8,
      "count": 200
    }
  },
  {
    "id": 3,
    "title": "Salted Caramel Cold Brew",
    "price": 5.25,
    "category": "cold brew",
    "description": "A delicious cold brew with a touch of salted caramel for a perfect balance of sweet and salty.",
    "image": "https://lifestyleofafoodie.com/wp-content/uploads/2022/10/Starbucks-salted-caramel-cold-foam-cold-brew-7-of-14-768x1152.jpg",
    "rating": {
      "rate": 4.6,
      "count": 180
    }
  },
  {
    "id": 4,
    "title": "Mocha Cold Brew",
    "price": 5.50,
    "category": "cold brew",
    "description": "A rich and chocolatey mocha cold brew, combining the bold flavors of coffee and chocolate.",
    "image": "https://heartbeetkitchen.com/foodblog/wp-content/uploads/2018/08/iced-mocha-1a.jpg",
    "rating": {
      "rate": 4.5,
      "count": 170
    }
  },
  {
    "id": 5,
    "title": "Coconut Cold Brew",
    "price": 5.75,
    "category": "cold brew",
    "description": "A refreshing cold brew with a hint of coconut, perfect for a tropical twist on your coffee.",
    "image": "https://thefirstmess.com/wp-content/uploads/2020/07/04-12311-post/double-coconut-cold-brew-1-1480x1850.jpg",
    "rating": {
      "rate": 4.8,
      "count": 190
    }
  },
  {
    "id": 6,
    "title": "Mint Cold Brew",
    "price": 5.50,
    "category": "cold brew",
    "description": "A unique cold brew infused with mint, offering a cool and invigorating coffee experience.",
    "image": "https://th.bing.com/th/id/OIP.KAFrZSvAtTijSQ_0fhRZKAHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "rating": {
      "rate": 4.6,
      "count": 160
    }
  },
  {
    "id": 7,
    "title": "Toffee Nut Cold Brew",
    "price": 5.75,
    "category": "cold brew",
    "description": "A delicious toffee nut cold brew, blending the rich flavors of toffee and nuts with smooth cold brew coffee.",
    "image": "https://th.bing.com/th/id/OIP.5GEP-NTOlal_AsgzX2uakgHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "rating": {
      "rate": 4.8,
      "count": 140
    }
  },
  {
    "id": 8,
    "title": "Honey Almond Milk Cold Brew",
    "price": 5.25,
    "category": "cold brew",
    "description": "A delightful cold brew with honey and almond milk for a lightly sweet and nutty flavor.",
    "image": "https://baking-ginger.com/wp-content/uploads/2022/05/Honey-Almond-Milk-Cold-Brew-5-500x500.jpg",
    "rating": {
      "rate": 4.7,
      "count": 180
    }
  },
  {
    "id": 9,
    "title": "Pumpkin Spice Cold Brew",
    "price": 6.00,
    "category": "cold brew",
    "description": "A seasonal favorite, combining cold brew coffee with the warm flavors of pumpkin spice.",
    "image": "https://thecollegehousewife.com/wp-content/uploads/2021/09/Pumpkin-Spice-Cold-Brew-6-1440x2160.jpg",
    "rating": {
      "rate": 4.9,
      "count": 125
    }
  },
  {
    "id": 10,
    "title": "Nitro Cold Brew",
    "price": 6.50,
    "category": "cold brew",
    "description": "A smooth and creamy nitro cold brew, infused with nitrogen for a velvety texture and rich flavor.",
    "image": "https://th.bing.com/th/id/OIP.EjR2HQoxeBuWV7XW1ACHUwHaE8?rs=1&pid=ImgDetMain",
    "rating": {
      "rate": 4.9,
      "count": 200
    }
  }
]

const HotBrewData = [
  {
    id: 1,
    title: "Classic Americano",
    price: 4.50,
    category: "hot brew",
    description: "A robust Americano with a strong coffee flavor and a smooth finish.",
    rating: {
      rate: 4.7,
      count: 150
    },
    image: "https://www.roastycoffee.com/wp-content/uploads/photo-1514432324607-a09d9b4aefdd-735x1103.jpeg"
  },
  {
    id: 2,
    title: "Espresso",
    price: 3.00,
    category: "hot brew",
    description: "A bold and concentrated espresso shot with a velvety crema.",
    rating: {
      rate: 4.8,
      count: 200
    },
    image: "https://th.bing.com/th/id/OIP.is0X6uUWy0VQHeSOFIn-GgHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  },
  {
    id: 3,
    title: "Latte",
    price: 5.00,
    category: "hot brew",
    description: "A smooth and creamy latte with a rich espresso base, topped with steamed milk and a light foam.",
    rating: {
      rate: 4.6,
      count: 180
    },
    image: "https://wallpaperaccess.com/full/5043183.jpg"
  },
  {
    id: 4,
    title: "Cappuccino",
    price: 4.75,
    category: "hot brew",
    description: "A smooth and creamy latte with a rich espresso base and light foam.",
    rating: {
      rate: 4.5,
      count: 170
    },
    image: "https://c1.wallpaperflare.com/preview/237/270/473/coffee-latte-art-froth.jpg"
  },
  {
    id: 5,
    title: "Matcha Hot Brew",
    price: 5.25,
    category: "hot brew",
    description:"A vibrant Matcha Hot Brew with steamed milk and a touch of sweetness.",
    rating: {
      rate: 4.8,
      count: 160
    },
    image: "https://cdn.shopify.com/s/files/1/0658/2619/articles/Let_s_Matcha_latte_1024x1024.jpeg?v=1590525790"
  },
  {
    id: 6,
    title: "Caramel Macchiato",
    price: 5.75,
    category: "hot brew",
    description: "A sweet and creamy caramel macchiato with espresso, vanilla syrup, and a drizzle of caramel sauce.",
    rating: {
      rate: 4.8,
      count: 190
    },
    image: "https://thelittlestcrumb.com/wp-content/uploads/salted-caramel-macchiato-6-768x1152.jpg"
  },
  {
    id: 7,
    title: "Irish Coffee",
    price: 6.00,
    category: "hot brew",
    description: "A spirited Irish coffee with espresso, Irish whiskey, and whipped cream.",
    rating: {
      rate: 4.6,
      count: 140
    },
    image: "https://boulderlocavore.com/wp-content/uploads/2015/02/irish-coffee-sq.jpg"
  },
  {
    id: 8,
    title: "Affogato",
    price: 6.50,
    category: "hot brew",
    description: "A delightful affogato with hot espresso over vanilla ice cream.",
    rating: {
      rate: 4.9,
      count: 125
    },
    image: "https://www.agropursolutions.ca/sites/agropursolutions/files/2021-02/Affogato_0.jpg"
  }
];


const ChurrosData = [
  {
    id: 1,
    title: "Churritos",
    price: 12,
    category: "churros",
    description: "perfectly crispy, fluffy mini churros dusted with spiced sugar and paired with a trio of delicious dipping sauces.",
    image: "https://th.bing.com/th/id/OIP.jtowfmZ92fC8xpKnvj212gHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 3.9,
      count: 120,
    }
  },
  {
    id: 2,
    title: "Churro Sundae",
    price: 15,
    category: "churros",
    description: " cinnamon-dusted churros with velvety ice cream and a swirl of salted caramel.",
    image: "https://th.bing.com/th/id/OIP.yCpIReokyrqn-oNxn4PZtwHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.1,
      count: 259
    }
  },
  {
    id: 3,
    title: "Churro Fiesta",
    price: 16,
    category: "churros",
    description: "Churro with whipcream, Chocolate,Caramel and Rainbow Sprinkles.",
    image: "https://th.bing.com/th/id/OIP.nOhs2RUH0msQPt6nFoCMOAHaHo?w=186&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.3,
      count: 500
    }
  },
  {
    id: 4,
    title: "Maple Delight",
    price: 13,
    category: "churros",
    description: "golden churros infused with maple syrup, rolled in cinnamon sugar, and served with a luscious maple cream dip.",
    image: "https://th.bing.com/th/id/OIP.KajbYKVw2X-KH9Ohnhe7cQHaJ4?w=186&h=248&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.0,
      count: 430
    }
  },
  {
    id: 5,
    title: "Mississipi peanut butter",
    price: 12.5,
    category: "churros",
    description: "crispy churros swirled with rich peanut butter and dusted with powdered sugar, complemented by a decadent chocolate sauce.",
    image: "https://th.bing.com/th/id/OIP.Sp6HPTkfLc2K0o34887EcgHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.6,
      count: 400
    }
  },
  {
    id: 6,
    title: "Dulche deleche",
    price: 11,
    category: "churros",
    description: "lightly crispy, golden churros drizzled with rich caramel and sprinkled with sea salt for a sweet and savory indulgence.",
    image: "https://th.bing.com/th/id/OIP.oBoSXpod2t4s0vuqFi_nGAHaIp?w=186&h=217&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 3.9,
      count: 70
    }
  },
  {
    id: 7,
    title: "Tiramisu Coffee",
    price: 12.77,
    category: "churros",
    description: "espresso-infused churros dusted with cocoa sugar and paired with a creamy mascarpone dip.",
    image: "https://th.bing.com/th/id/OIP.fN1Zeeyzw70_oMeKjsvOWgHaE7?w=186&h=124&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 3.8,
      count: 400
    }
  },
  {
    id: 8,
    title: "Tortoise caramel Pecan",
    price: 13,
    category: "churros",
    description: "filled with gooey caramel, topped with crunchy pecans, and drizzled with rich chocolate.",
    image: "https://th.bing.com/th/id/OIP.aCfCE9LSwHv3hVwPphTk3QHaEg?w=186&h=113&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.0,
      count: 100
    }
  },
  {
    id: 9,
    title: " Cinnamon Sugar",
    price: 13.2,
    category: "churros",
    description: "golden, crispy churros generously coated in a sweet cinnamon-sugar blend.",
    image: "https://th.bing.com/th/id/OIP.nOMxuBBP_Ve_1IYCxgtyRQHaE8?w=186&h=124&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.8,
      count: 203
    }
  },
  {
    id: 10,
    title: "Ultimate Mix",
    price: 14,
    category: "Churros",
    description: "a delightful blend of cinnamon-sugar, chocolate-filled, and caramel-pecan varieties.",
    image: "https://th.bing.com/th/id/OIP.wz397TNLrTczsuvzn411tgHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: {
      rate: 4.1,
      count: 470
    }
  },
];


const ProductCard = ({ product }) => (
  <View style={styles.card}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{product.title}</Text>
      <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.cardRating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
      <Text>{product.description}</Text>
    </View>
  </View>
);

const OrdersPage = () => {
  const { selectedCategory } = useCategory();

  const getData = () => {
    switch (selectedCategory) {
      case 'cold brew':
        return ColdbrewData;
      case 'hot brew':
        return HotBrewData;
      case 'churros':
        return ChurrosData;
      default:
        return [...ColdbrewData, ...HotBrewData, ...ChurrosData];
    }
  };

  const renderProductCard = ({ item }) => <ProductCard product={item} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>{selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All Products'}</Text>
      <FlatList
        data={getData()}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.sectionContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0DAAE',
    paddingHorizontal: 8,
    marginBottom: 200,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  sectionContainer: {
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#fffcf7',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    margin: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 16,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#d9534f',
  },
  cardRating: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default OrdersPage;
