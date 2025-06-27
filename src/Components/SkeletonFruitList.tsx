import styles from "./FruitsList.module.css";

export default function SkeletonFruitList() {
  const StubArray: number[] = Array.from({ length: 20 }, (_) => 0);

  return (
    <ul className={styles.skeletonList} role="list">
      {StubArray.map((_, index) => (
        <li key={index} className={`Loading ${styles.skeletonItemRow}`}></li>
      ))}
    </ul>
  );
}
