import React, { createContext, useContext, useEffect, useReducer } from "react";

const LOCAL_STORAGE_KEY = "cartState";

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QTY = "UPDATE_QTY";
const CLEAR_CART = "CLEAR_CART";
const APPLY_COUPON = "APPLY_COUPON";
const REMOVE_COUPON = "REMOVE_COUPON";

function getInitialState() {
  if (typeof window === "undefined") {
    return { items: [], appliedCoupon: null, discountAmount: 0 };
  }
  try {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to load cart from localStorage:", err);
  }
  return { items: [], appliedCoupon: null, discountAmount: 0 };
}

function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { item, quantity } = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      const items = exists
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...state.items, { ...item, quantity }];
      return { ...state, items };
    }
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
    case UPDATE_QTY:
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case CLEAR_CART:
      return { items: [], appliedCoupon: null, discountAmount: 0 };
    case APPLY_COUPON:
      return {
        ...state,
        appliedCoupon: action.payload.code,
        discountAmount: action.payload.amount,
      };
    case REMOVE_COUPON:
      return { ...state, appliedCoupon: null, discountAmount: 0 };
    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [state]);

  const addItem = (item, qty = 1) =>
    dispatch({ type: ADD_ITEM, payload: { item, quantity: qty } });
  const removeItem = (id) => dispatch({ type: REMOVE_ITEM, payload: { id } });
  const updateQty = (id, qty) =>
    dispatch({ type: UPDATE_QTY, payload: { id, quantity: qty } });
  const clearCart = () => dispatch({ type: CLEAR_CART });
  const applyCoupon = (code, amount) =>
    dispatch({ type: APPLY_COUPON, payload: { code, amount } });
  const removeCoupon = () => dispatch({ type: REMOVE_COUPON });

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        appliedCoupon: state.appliedCoupon,
        discountAmount: state.discountAmount,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
