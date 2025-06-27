import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./Collapsible.module.css";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  headerActions?: ReactNode; // For buttons like "Add all to jar"
}

export default function Collapsible({
  title,
  children,
  headerActions,
}: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className={styles.collapsible}>
      <div className={styles.header} onClick={toggleCollapse}>
        <h2 className={styles.title}>
          <span className={styles.icon}>{isCollapsed ? "▶" : "▼"}</span>
          {title}
        </h2>
        {headerActions && !isCollapsed && (
          <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            {headerActions}
          </div>
        )}
      </div>
      {!isCollapsed && <div className={styles.content}>{children}</div>}
    </div>
  );
}
