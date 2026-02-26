import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

  // 🔥 Load from localStorage initially
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // 🔥 Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // ❤️ Wishlist
  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (id) =>
    wishlist.some(item => item.id === id);

  const removeFromWishlist = (id) =>
    setWishlist(wishlist.filter(item => item.id !== id));

  // 🛒 Cart
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

  const increaseQty = (id) =>
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));

  const decreaseQty = (id) =>
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));

  const removeFromCart = (id) =>
    setCart(cart.filter(item => item.id !== id));

  const getTotal = () =>
    cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const clearCart = () => setCart([]);

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
      clearCart,
      isInWishlist,
      user,
      setUser
    }}>
      {children}
    </ShopContext.Provider>
  );
};