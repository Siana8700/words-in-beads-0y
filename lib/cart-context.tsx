"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"

export type CartItem = {
  id: string
  slug: string
  title: string
  variantName: string
  image: string
  priceEur: number
  personalization?: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartItem }
  | { type: "updateQty"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" }

const STORAGE_KEY = "wib-cart"

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items }
    case "add": {
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i,
          ),
        }
      }
      return { items: [...state.items, action.item] }
    }
    case "updateQty":
      return {
        items: state.items
          .map((i) =>
            i.id === action.id
              ? { ...i, quantity: Math.max(1, action.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      }
    case "remove":
      return { items: state.items.filter((i) => i.id !== action.id) }
    case "clear":
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  count: number
  totalEur: number
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void
  updateQty: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const items = JSON.parse(raw) as CartItem[]
        if (Array.isArray(items)) dispatch({ type: "hydrate", items })
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore write errors
    }
  }, [state.items])

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const totalEur = state.items.reduce(
      (sum, i) => sum + i.priceEur * i.quantity,
      0,
    )
    return {
      items: state.items,
      count,
      totalEur,
      addItem: (item) => {
        const personalization = item.personalization?.trim() || undefined
        const id = `${item.slug}__${item.variantName}__${personalization ?? ""}`
        dispatch({
          type: "add",
          item: { ...item, personalization, id, quantity: item.quantity ?? 1 },
        })
      },
      updateQty: (id, quantity) => dispatch({ type: "updateQty", id, quantity }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clear: () => dispatch({ type: "clear" }),
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
