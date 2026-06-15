import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Load wishlist after login
  useEffect(() => {

    if (!user || !user.id) return;

   fetch(`http://localhost:5000/wishlist/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [user]);

  // Save cart
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Save user
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }, [user]);

  // Save token
  useEffect(() => {

    if (token) {
      localStorage.setItem(
        "token",
        token
      );
    }

  }, [token]);

  // -----------------------
  // WISHLIST
  // -----------------------

  const addToWishlist = async (product) => {

    if (!user) {
      alert("Please login first");
      return;
    }

    const alreadyExists = wishlist.find(
  item => item.id === product.id
);

    if (alreadyExists) {
      return;
    }

    await fetch(
  "http://localhost:5000/wishlist",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user.id,
      productId: product.id
    })
  }
);

    const response = await fetch(
  `http://localhost:5000/wishlist/${user.id}`
);

    const data = await response.json();

    setWishlist(data);
  };

  const removeFromWishlist = async (productId) => {

    await fetch(
  `http://localhost:5000/wishlist/${user.id}/${productId}`,
  {
    method: "DELETE"
  }
);

    const response = await fetch(
  `http://localhost:5000/wishlist/${user.id}`
);

    const data = await response.json();

    setWishlist(data);
  };

  const isInWishlist = (productId) =>
  wishlist.some(
    (item) => item.id === productId
  );

  // -----------------------
  // CART
  // -----------------------

  const addToCart = (product) => {

    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }
  };

  const increaseQty = (id) =>
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  const decreaseQty = (id) =>
    setCart(
      cart.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
    );

  const removeFromCart = (id) =>
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );

  const getTotal = () =>
    cart.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  const clearCart = () =>
    setCart([]);

  return (
    <ShopContext.Provider
      value={{
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
        setUser,
        token,
        setToken
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};