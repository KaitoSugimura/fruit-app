import { useEffect, useState } from "react";
import type { Fruit } from "../Types/Fruit";

export default function useFruity() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const res = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
          headers: {
            "x-api-key": "fruit-api-challenge-2025",
          },
        });
        if (!res.ok) throw new Error(`HTTP error with status: ${res.status}`);
        const data: Fruit[] = await res.json();
        setFruits(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  return { fruits, loading, error };
}
