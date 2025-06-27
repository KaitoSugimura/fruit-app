import { useColorThemeContext } from "../../Context/ThemeContext";
import { useFruitJarContext } from "../../Context/FruitJarContext";
import { useEffect, useState } from "react";
import type { Fruit } from "../../Types/Fruit";
import styles from "./LeftSection.module.css";
import SkeletonFruitList from "../../Components/SkeletonFruitList";
import FruitsList from "../../Components/FruitsList";
import Collapsible from "../../Components/Collapsible";

type GroupedFruits = {
  [groupName: string]: Fruit[];
};

type GroupByType = "none" | "family" | "genus" | "order";
export type ListByType = "table" | "list";

export default function LeftSection() {
  const {
    fruits,
    loading,
    error,
    incrementJarFruitQuantity,
    decrementJarFruitQuantity,
  } = useFruitJarContext();
  const { colorTheme, setColorTheme } = useColorThemeContext();

  const [groups, setGroups] = useState<{
    [groupName: string]: Fruit[];
  }>({});
  const [groupBy, setGroupBy] = useState<GroupByType>("none");
  const [listBy, setListBy] = useState<ListByType>("list");

  useEffect(() => {
    if (fruits.length === 0) return;
    if (groupBy === "none") return;
    const groupedFruits: GroupedFruits = {};
    fruits.forEach((fruit) => {
      const groupName = fruit[groupBy] || "family";
      if (!groupedFruits[groupName]) {
        groupedFruits[groupName] = [];
      }
      groupedFruits[groupName].push(fruit);
    });
    setGroups(groupedFruits);
  }, [fruits, groupBy]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>
          Error loading fruits: Unable to fetch fruits. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.leftSectionRoot}>
      <div className={styles.homeRootLeftSideTopBar}>
        <div className={styles.homeRootLeftSideDropDowns}>
          <select
            value={groupBy}
            onChange={(e) =>
              setGroupBy(
                e.target.value as "none" | "family" | "genus" | "order"
              )
            }
          >
            <option value="none">No Grouping</option>
            <option value="family">Group by Family</option>
            <option value="genus">Group by Genus</option>
            <option value="order">Group by Order</option>
          </select>

          <select
            value={colorTheme}
            onChange={(e) =>
              setColorTheme(e.target.value as "light" | "dark" | "system")
            }
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
            <option value="system">System Theme</option>
          </select>
        </div>

        <div className={styles.TopBarButtons}>
          <button
            className={`${styles.listByButton} ${
              listBy === "list" ? styles.activeButton : ""
            }`}
            onClick={() => setListBy("list")}
          >
            <img
              src="./Icons/list.svg"
              alt="List view"
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>

          <button
            className={`${styles.listByButton} ${
              listBy === "table" ? styles.activeButton : ""
            }`}
            onClick={() => setListBy("table")}
          >
            <img
              src="./Icons/table.svg"
              alt="List view"
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className={styles.fruitsListContainer}>
        <div className={styles.fruitsListScrollArea}>
          {loading ? (
            // Data still loading
            <SkeletonFruitList />
          ) : groupBy === "none" ? (
            // No grouping, flat list/table
            <FruitsList fruitsToList={fruits} listType={listBy} />
          ) : (
            // Grouped by family/genus/order
            Object.entries(groups).map(([groupName, groupedFruits]) => (
              <Collapsible
                key={groupName}
                title={groupName}
                headerActions={
                  <>
                    <button
                      className={styles.addToJarButton}
                      onClick={() => {
                        groupedFruits.forEach((fruit) =>
                          decrementJarFruitQuantity(fruit.name)
                        );
                      }}
                    >
                      -1 all items
                    </button>
                    <button
                      className={styles.addToJarButton}
                      onClick={() => {
                        groupedFruits.forEach((fruit) =>
                          incrementJarFruitQuantity(fruit.name)
                        );
                      }}
                    >
                      +1 all items
                    </button>
                  </>
                }
              >
                <FruitsList fruitsToList={groupedFruits} listType={listBy} />
              </Collapsible>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
