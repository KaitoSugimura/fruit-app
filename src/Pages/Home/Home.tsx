import styles from "./Home.module.css";
import { useState, useRef } from "react";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";

export default function Home() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState<number>(window.innerWidth / 2);

  const onMouseDownHandleResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftPanelRef.current?.getBoundingClientRect().width ?? 0;
    document.body.style.userSelect = "none";

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const newWidth = startWidth + delta;
      setLeftWidth(Math.min(Math.max(500, newWidth), window.innerWidth - 500));
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "ew-resize";
  };

  return (
    <div className={styles.homeRoot}>
      <div
        className={styles.homeRootLeftSide}
        ref={leftPanelRef}
        style={{
          width: `${leftWidth}px`,
        }}
      >
        <LeftSection />
      </div>
      <div
        className={styles.middleResizer}
        onMouseDown={onMouseDownHandleResize}
      >
        {/* To resize the Left panel (Right panel will fill width) */}
        <div className={styles.middleResizerLine}></div>
      </div>
      <div className={styles.homeRootRightSide}>
        <RightSection />
      </div>
    </div>
  );
}
