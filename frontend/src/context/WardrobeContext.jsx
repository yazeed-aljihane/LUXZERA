// src/context/WardrobeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const WardrobeContext = createContext(null);

const STORAGE_KEY = "luxzera-wardrobe";
const DEFAULT_COLLECTIONS = ["Casual", "Office", "Streetwear", "Date Night", "Vacation", "Winter"];

function readStored() {
  if (typeof window === "undefined") return { items: [], collections: DEFAULT_COLLECTIONS };
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [], collections: DEFAULT_COLLECTIONS };
  } catch {
    return { items: [], collections: DEFAULT_COLLECTIONS };
  }
}

export function WardrobeProvider({ children }) {
  const [wardrobeItems, setWardrobeItems] = useState(() => readStored().items);
  const [collections, setCollections]     = useState(() => readStored().collections);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: wardrobeItems, collections }));
  }, [wardrobeItems, collections]);

  const isSaved = (productId) => wardrobeItems.some((i) => i.id === productId);

  const toggleWardrobe = (product, collectionName = "Casual") => {
    setWardrobeItems((prev) => {
      if (prev.find((i) => i.id === product.id)) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, { ...product, collection: collectionName, savedAt: Date.now() }];
    });
  };

  const moveToCollection = (productId, collectionName) => {
    setWardrobeItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, collection: collectionName } : i))
    );
  };

  const createCollection = (name) => {
    if (!collections.includes(name)) setCollections((prev) => [...prev, name]);
  };

  const removeCollection = (name) => {
    setCollections((prev) => prev.filter((c) => c !== name));
    setWardrobeItems((prev) => prev.filter((i) => i.collection !== name));
  };

  const itemsInCollection = (name) => wardrobeItems.filter((i) => i.collection === name);

  const wardrobeCount = wardrobeItems.length;

  return (
    <WardrobeContext.Provider value={{
      wardrobeItems,
      collections,
      wardrobeCount,
      isSaved,
      toggleWardrobe,
      moveToCollection,
      createCollection,
      removeCollection,
      itemsInCollection,
    }}>
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  const ctx = useContext(WardrobeContext);
  if (!ctx) throw new Error("useWardrobe must be used inside WardrobeProvider");
  return ctx;
}
