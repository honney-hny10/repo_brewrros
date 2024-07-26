import React, { createContext, useReducer, useContext, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        const updatedCart = state.cart.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }
    case 'INCREASE_QUANTITY': {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cart: updatedCart };
    }
    case 'DECREASE_QUANTITY': {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        const item = state.cart[itemIndex];
        if (item.quantity > 1) {
          const updatedCart = state.cart.map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          return { ...state, cart: updatedCart };
        } else {
          const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
          return { ...state, cart: updatedCart };
        }
      }
      return state;
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id } });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <View style={styles.quantityButtons}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    console.log('Order placed');
    setShowAlert(true);
    setTimeout(() => {
      clearCart();
      setShowAlert(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>${calculateTotal()}</Text>
            <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Order placed successfully!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffcf7',
    padding: 24,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#d9534f',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  quantityButtons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#A3966A',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#A3966A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, 
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyCart: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 32,
    color: '#777',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fffcf7',
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d9534f',
    marginRight: 16,
  },
  placeOrderButton: {
    backgroundColor: '#A3966A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  alertContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#A3966A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartPage;
