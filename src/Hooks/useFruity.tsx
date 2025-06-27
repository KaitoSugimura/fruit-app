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
        const res = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
          headers: {
            Origin: "https://localhost:5174",
            "x-api-key": "fruit-api-challenge-2025",
          },
        });

        if (res.ok) {
          const data: Fruit[] = await res.json();
          setFruits(data);
          console.log("Successfully fetched from API");
          return;
        }
      } catch (err) {
        console.warn("Direct fetch failed, using proxy");

        try {
          const resAttempt2 = await fetch(
            "https://fruit-app-proxy-server.onrender.com/proxy"
          );

          if (resAttempt2.ok) {
            const data: Fruit[] = await resAttempt2.json();
            setFruits(data);
            console.log("Successfully fetched from Proxy");
            return;
          }

          console.warn(`Proxy server unavailable (${resAttempt2.status})`);
          setError(
            `Unable to load fruit data - The proxy server has blocked the request`
          );
        } catch (err) {
          // Network error or server error, will just default to network error
          console.warn("API and proxy server both failed: ", err);
          setError(
            "Unable to load fruit data - Both the API and proxy server failed the request."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  return { fruits, loading, error };
}
