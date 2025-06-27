import { useFruitJarContext } from "../../Context/FruitJarContext";
import PieChart from "../../Components/PieChart";
import styles from "./RightSection.module.css";
import { useEffect, useRef, useState, useCallback } from "react";

export default function RightSection() {
  const { jar } = useFruitJarContext();
  const [showSettings, setShowSettings] = useState(false);
  const [showPieChart, setShowPieChart] = useState(true);
  const [dataType, setDataType] = useState<"quantity" | "calories">("calories");
  const [colorType, setColorType] = useState<"unique" | "dynamic">("dynamic");
  const settingsRef = useRef<HTMLDivElement>(null);

  const totalCalories = Object.values(jar).reduce((total, data) => {
    return total + (data.quantity || 0) * (data.calories || 0);
  }, 0);

  const dataEntries = Object.entries(jar);

  const quantityData = dataEntries
    .filter(([_, item]) => item.quantity > 0)
    .map(([name, item]) => ({
      name,
      value: item.quantity,
    }));

  const caloriesData = dataEntries
    .filter(([_, item]) => item.quantity > 0 && item.calories)
    .map(([name, item]) => ({
      name,
      value: (item.quantity || 0) * (item.calories || 0),
    }));

  const dataToGraph = dataType === "quantity" ? quantityData : caloriesData;
  const dataUnits = dataType === "quantity" ? "items" : "calories";

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target as Node)
    ) {
      setShowSettings(false);
    }
  }, []);

  useEffect(() => {
    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings, handleClickOutside]);

  return (
    <div className={styles.rightSideRoot}>
      <div className={styles.topBar}>
        <h2>The Fruit Jar</h2>

        <div className={styles.settingsContainer} ref={settingsRef}>
          <button
            className={styles.settingsButton}
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <img
              src="./Icons/settings.svg"
              alt="List view"
              width={20}
              height={20}
              aria-hidden="true"
            />
            Settings
          </button>

          {showSettings && (
            <div className={styles.settingsPopup}>
              <p className={styles.settingsLabel}>Show Chart</p>
              <div className={styles.buttonsContainer}>
                <button
                  className={`${styles.button} ${
                    showPieChart ? styles.activeButton : ""
                  }`}
                  onClick={() => setShowPieChart(true)}
                >
                  Show
                </button>
                <button
                  className={`${styles.button} ${
                    !showPieChart ? styles.activeButton : ""
                  }`}
                  onClick={() => setShowPieChart(false)}
                >
                  Hide
                </button>
              </div>
              <p className={styles.settingsLabel}>Graph by</p>
              <div className={styles.buttonsContainer}>
                <button
                  className={`${styles.button} ${
                    dataType === "calories" ? styles.activeButton : ""
                  }`}
                  onClick={() => setDataType("calories")}
                >
                  Calories
                </button>
                <button
                  className={`${styles.button} ${
                    dataType === "quantity" ? styles.activeButton : ""
                  }`}
                  onClick={() => setDataType("quantity")}
                >
                  Quantity
                </button>
              </div>
              <p className={styles.settingsLabel}>Chart Color</p>
              <div className={styles.buttonsContainer}>
                <button
                  className={`${styles.button} ${
                    colorType === "dynamic" ? styles.activeButton : ""
                  }`}
                  onClick={() => setColorType("dynamic")}
                >
                  Dynamic
                </button>
                <button
                  className={`${styles.button} ${
                    colorType === "unique" ? styles.activeButton : ""
                  }`}
                  onClick={() => setColorType("unique")}
                >
                  Unique
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPieChart && (
        <PieChart
          data={dataToGraph}
          title={`${
            dataType === "quantity" ? "Quantity" : "Calories"
          } Distribution by Fruit Type`}
          dataUnits={dataUnits}
          colorType={colorType}
        />
      )}

      <div className={styles.fruitList}>
        <h3>Fruits you've added</h3>
        {Object.entries(jar).map(
          ([fruitName, data]) =>
            (data.quantity || 0 > 0) && (
              <div key={fruitName} className={styles.fruitItem}>
                {data.quantity} {fruitName} -{" "}
                {(data.calories || 0) * (data.quantity || 0)} calories
              </div>
            )
        )}
      </div>

      <div className={styles.totalCalories}>
        Total Calories: {totalCalories}
      </div>
    </div>
  );
}
