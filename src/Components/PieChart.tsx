import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import styles from "./PieChart.module.css";

interface PieChartProps {
  data: { name: string; value: number }[];
  title: string;
  dataUnits: string;
  colorType: "unique" | "dynamic";
}

const generateColor = (index: number, totalAmountOfData: number): string => {
  const hue = (index * 360) / totalAmountOfData;
  return `hsl(${hue}, 85%, 55%)`;
};

const generateUniqueColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);

  const saturation = 75 + (Math.abs(hash) % 10);
  const lightness = 50 + (Math.abs(hash >> 8) % 15);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function PieChart({
  data,
  dataUnits,
  title,
  colorType,
}: PieChartProps) {
  if (data.length === 0) {
    return (
      <div className={styles.emptyPieChart}>
        <p>Please add at least one item to view the pie chart</p>
      </div>
    );
  }

  return (
    <div className={styles.pieChartContainer}>
      <h3>
        {title} ({dataUnits})
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          {data.length > 0 && (
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((d, index) => (
                <Cell
                  key={`inner-${index}`}
                  fill={
                    colorType === "unique"
                      ? generateUniqueColor(d.name)
                      : generateColor(index, data.length)
                  }
                  opacity={1}
                />
              ))}
            </Pie>
          )}

          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} ${dataUnits}`,
              name,
            ]}
          />
          <Legend formatter={(value) => value} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
