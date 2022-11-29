// import { createContext, ReactNode, useEffect, useState } from "react";
import { Product } from "../Utils/Redux/features/categories/categoriesSlice";

// interface CartProviderProps {
//   children: ReactNode;
// }

// export type CartItem = Omit<Product, "quantity">;

// type Context = {
//   cartCount: number;
//   cartTotal: number;
// };

// const cartContextState: Context = {
//   cartCount: 0,
//   cartTotal: 0,
// };

// const addItemToCart = (cartItems: Array<Product>, productToAdd: CartItem) => {
//   const existingCartItem = cartItems.find(
//     (product) => product.id === productToAdd.id
//   );

//   if (existingCartItem) {
//     return cartItems.map((product) =>
//       product.id === productToAdd.id
//         ? { ...product, quantity: (product.quantity as number) + 1 }
//         : product
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (
//   cartItems: Array<Product>,
//   productToRemove: Product
// ) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToRemove.id
//   );
//   if (existingCartItem?.quantity === 1) {
//     return cartItems.filter((product) => product.id !== productToRemove.id);
//   }

//   return cartItems.map((product) =>
//     product.id === productToRemove.id
//       ? { ...product, quantity: (product.quantity as number) - 1 }
//       : product
//   );
// };

// const clearCartItem = (cartItems: Array<Product>, productToRemove: Product) => {
//   return cartItems.filter((product) => product.id !== productToRemove.id);
// };

// export const CartContext = createContext(cartContextState);

// export const CartProvider = ({ children }: CartProviderProps) => {
//   const [cartItems, setCartItems] = useState<Array<Product>>([]);
//   const [cartCount, setCartCount] = useState<number>(0);
//   const [cartTotal, setCartTotal] = useState<number>(0);

//   const addToCart = (productToAdd: CartItem) => {
//     setCartItems(addItemToCart(cartItems, productToAdd));
//   };

//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (total, cartItem) => total + (cartItem.quantity as number),
//       0
//     );
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   useEffect(() => {
//     const newCartTotal = cartItems.reduce(
//       (total, cartItem) =>
//         total + (cartItem.quantity as number) * cartItem.price,
//       0
//     );
//     setCartTotal(newCartTotal);
//   }, [cartItems]);

//   const removeFromCart = (productToRemove: Product) => {
//     setCartItems(removeCartItem(cartItems, productToRemove));
//   };

//   const clearFromCart = (productToRemove: Product) => {
//     setCartItems(clearCartItem(cartItems, productToRemove));
//   };

//   const value = {
//     cartCount,
//     cartTotal,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
