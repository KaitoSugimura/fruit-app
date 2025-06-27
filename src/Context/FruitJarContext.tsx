import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Fruit } from "../Types/Fruit";
import useFruity from "../Hooks/useFruity";

export type Jar = {
  [fruitName: string]: {
    quantity: number;
    calories: number;
  };
};

export type InputState = {
  [fruitName: string]: string;
};

interface FruitJarContextType {
  fruits: Fruit[];
  jar: Jar;
  loading: boolean;
  error: string | null;
  updateJarFruitQuantity: (fruitName: string, newQuantity: number) => void;
  incrementJarFruitQuantity: (fruitName: string) => void;
  decrementJarFruitQuantity: (fruitName: string) => void;
}

const FruitJarContext = createContext<FruitJarContextType | undefined>(
  undefined
);

interface FruitJarProviderProps {
  children: ReactNode;
}

export function useFruitJarContext() {
  const context = useContext(FruitJarContext);
  if (context === undefined) {
    throw new Error(
      "useFruitJarContext must be used within a FruitJarProvider"
    );
  }
  return context;
}

export function FruitJarProvider({ children }: FruitJarProviderProps) {
  const { fruits, loading, error } = useFruity();
  const [jar, setJar] = useState<Jar>({});

  useEffect(() => {
    const initJar: Jar = {};
    fruits.forEach((fruit) => {
      initJar[fruit.name] = {
        quantity: 0,
        calories: fruit.nutritions.calories,
      };
    });
    setJar(initJar);
  }, [fruits]);

  const updateJarFruitQuantity = (fruitName: string, newQuantity: number) => {
    setJar((prev) => ({
      ...prev,
      [fruitName]: {
        ...prev[fruitName],
        quantity: newQuantity,
      },
    }));
  };

  const incrementJarFruitQuantity = (fruitName: string) => {
    const newQuantity = (jar[fruitName]?.quantity || 0) + 1;
    setJar((prev) => ({
      ...prev,
      [fruitName]: {
        ...prev[fruitName],
        quantity: newQuantity,
      },
    }));
  };

  const decrementJarFruitQuantity = (fruitName: string) => {
    const newQuantity = Math.max(0, (jar[fruitName]?.quantity || 0) - 1);
    setJar((prev) => ({
      ...prev,
      [fruitName]: {
        ...prev[fruitName],
        quantity: newQuantity,
      },
    }));
  };

  const value: FruitJarContextType = {
    fruits,
    jar,
    loading,
    error,
    updateJarFruitQuantity,
    incrementJarFruitQuantity,
    decrementJarFruitQuantity,
  };

  return (
    <FruitJarContext.Provider value={value}>
      {children}
    </FruitJarContext.Provider>
  );
}
