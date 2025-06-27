import type { Fruit } from "../Types/Fruit";
import styles from "./FruitsList.module.css";
import FruitQuantityAdjuster from "./FruitQuantityAdjuster";
import type { ListByType } from "../Pages/Home/LeftSection";

interface Props {
  fruitsToList: Fruit[];
  listType: ListByType;
}

export default function FruitsList({ fruitsToList, listType }: Props) {
  return listType === "list" ? (
    <ul className={styles.list} role="list">
      {fruitsToList.map((fruit) => (
        <li key={fruit.id} className={styles.itemRow}>
          <h2 className={styles.itemTitle}>
            {fruit.name} ({fruit.nutritions.calories} cal)
          </h2>
          <div className={styles.fruitQuantityAdjusterContainer}>
            <FruitQuantityAdjuster fruit={fruit} />
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.tableContainer}>
      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Family</th>
            <th>Order</th>
            <th>Genus</th>
            <th>Calories</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {fruitsToList.map((fruit) => (
            <tr key={fruit.id} className={styles.tableRow}>
              <td className={styles.itemTitle}>{fruit.name}</td>
              <td>{fruit.family}</td>
              <td>{fruit.order}</td>
              <td>{fruit.genus}</td>
              <td>{fruit.nutritions.calories}</td>
              <td>
                <FruitQuantityAdjuster fruit={fruit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
