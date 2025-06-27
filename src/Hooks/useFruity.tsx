import { useEffect, useState } from "react";
import type { Fruit } from "../Types/Fruit";

export default function useFruity() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        // Attempt to fetch from the real API
        let res = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
          headers: {
            Origin: "https://localhost:5174",
            "x-api-key": "fruit-api-challenge-2025",
          },
        });

        // if (res.ok) {
        //   const data: Fruit[] = await res.json();
        //   setFruits(data);
        //   console.log("Successfully fetched from API");
        //   return;
        // }

        console.warn("Direct fetch failed, using proxy");

        res = await fetch("http://localhost:3001/proxy");

        if (res.ok) {
          const data: Fruit[] = await res.json();
          setFruits(data);
          console.log("Successfully fetched from Proxy");
          return;
        }

        // API blocked
        console.warn(`API blocked (${res.status})`);
        setError(`API blocked (${res.status})`);
      } catch (err) {
        // Network error or server error, will just default to network error
        console.warn("Network error:", err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  return { fruits, loading, error };
}
