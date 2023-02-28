import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../typeDef";

type useCartProps = {
  cartItems: Product[];
  getCartCount: () => number;
  getCartTotal: () => number;
  // eslint-disable-next-line no-unused-vars
  addToCart: (payload: Product) => void;
  // eslint-disable-next-line no-unused-vars
  subtractFromCart: (payload: Product) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (payload: Product) => void;
};

export const useCart = createStore<useCartProps>()(
  persist(
    (set, get) => ({
      cartItems: [],
      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, cartItem) => total + Number(cartItem.quantity),
          0
        );
      },
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, cartItem) =>
            total + Number(cartItem.quantity) * cartItem.price,
          0
        );
      },
      addToCart: (payload) =>
        set((state) => {
          const existingCartItem = state.cartItems?.find(
            (product) => product.id === payload.id
          );
          if (existingCartItem) {
            return {
              cartItems: state.cartItems?.map((product) =>
                product.id === payload.id
                  ? { ...product, quantity: Number(product.quantity) + 1 }
                  : product
              ),
            };
          }
          return {
            cartItems: [
              ...(state.cartItems as Product[]),
              { ...payload, quantity: 1 },
            ],
          };
        }),
      subtractFromCart: (payload) =>
        set((state) => {
          const existingCartItem = state.cartItems.find(
            (product) => product.id === payload.id
          );
          if (existingCartItem?.quantity === 1) {
            return {
              cartItems: state.cartItems.filter(
                (product) => product.id !== payload.id
              ),
            };
          }
          return {
            cartItems: state.cartItems.map((product) =>
              product.id === payload.id
                ? { ...product, quantity: Number(product.quantity) - 1 }
                : product
            ),
          };
        }),
      removeFromCart: (payload) =>
        set((state) => {
          return {
            cartItems: state.cartItems.filter(
              (product) => product.name !== payload.name
            ),
          };
        }),
    }),
    { name: "cartItems" }
  )
);

// const useCartTotal = () => {
//   const {cartItems} = useStore(useCart)
//   useMemo(() =>  (cartItems.reduce(
//             (total, cartItem) => total + Number(cartItem.quantity),
//             0
//           )
//   ),[cartItems])
// };
