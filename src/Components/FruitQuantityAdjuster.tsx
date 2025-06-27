import { useState, useEffect } from "react";
import styles from "./FruitQuantityAdjuster.module.css";
import type { Fruit } from "../Types/Fruit";
import { useFruitJarContext } from "../Context/FruitJarContext";

interface Props {
  fruit: Fruit;
}

export default function FruitQuantityAdjuster({ fruit }: Props) {
  const {
    jar,
    updateJarFruitQuantity,
    incrementJarFruitQuantity,
    decrementJarFruitQuantity,
  } = useFruitJarContext();

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const jarQuantity = jar[fruit.name]?.quantity || 0;
    if (jarQuantity === 0) {
      setInputValue("");
    } else {
      setInputValue(jarQuantity.toString());
    }
  }, [jar[fruit.name]?.quantity, fruit.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value !== "") {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateJarFruitQuantity(fruit.name, numValue);
      }
    }
  };

  const handleInputBlur = () => {
    const jarQuantity = jar[fruit.name]?.quantity || 0;
    if (inputValue === "") {
      updateJarFruitQuantity(fruit.name, 0);
    } else {
      setInputValue(jarQuantity.toString());
    }
  };

  const quantity = jar[fruit.name]?.quantity || 0;

  return (
    <div className={styles.itemInputContainer}>
      {quantity > 0 ? (
        <>
          <button
            onClick={() => decrementJarFruitQuantity(fruit.name)}
            className={styles.itemInputButton}
          >
            -
          </button>
          <input
            type="number"
            className={styles.itemInput}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min="0"
            placeholder="0"
          />
          <button
            onClick={() => incrementJarFruitQuantity(fruit.name)}
            className={styles.itemInputButton}
          >
            +
          </button>
        </>
      ) : (
        <button
          onClick={() => incrementJarFruitQuantity(fruit.name)}
          className={styles.addToJarButton}
        >
          Add to jar
        </button>
      )}
    </div>
  );
}
