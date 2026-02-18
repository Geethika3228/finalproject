import { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) =>
      total + item.price * item.quantity, 0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider value={{
      wishlist,
      cart,
      addToWishlist,
      removeFromWishlist,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      getTotal,
      clearCart
    }}>
      {children}
    </ShopContext.Provider>
  );
};
