import { useEffect, useState } from "react";
import type { Fruit } from "../Types/Fruit";
import { FALLBACK_FRUIT_DATA } from "../FallbackData/FallbackFruits";

export default function useFruity() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        // Attempt to fetch from the real API
        const res = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
          headers: {
            "x-api-key": "fruit-api-challenge-2025",
          },
        });

        if (res.ok) {
          const data: Fruit[] = await res.json();
          setFruits(data);
          console.log("Successfully fetched from API");
          //print the data in object form so i can copy and paste it into fallback data
          console.log(JSON.stringify(data, null, 2));
          return;
        }

        // API blocked
        console.warn(`API blocked (${res.status})`);
        setFruits(FALLBACK_FRUIT_DATA);
        setError(`API blocked (${res.status})`);
      } catch (err) {
        // Network error or server error, will just default to network error
        console.warn("Network error:", err);
        setFruits(FALLBACK_FRUIT_DATA);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  return { fruits, loading, error };
}
