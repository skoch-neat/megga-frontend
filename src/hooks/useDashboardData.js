import { useState, useEffect, useMemo } from "react";
import { apiService } from "../services/api";

export const useDashboardData = (userId) => {
  const [thresholds, setThresholds] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [initialLoad, setInitialLoad] = useState(true);
  // const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!userId) {
      if (import.meta.env.DEV) {
        console.error("❌ No user ID provided.");
      }
      setLoading(false);
      return;
    }

    if (import.meta.env.DEV) {
      console.log("🔍 Fetching thresholds for userId:", userId);
    }

    const fetchData = (async () => {
      try {
        // if (initialLoad || isFetching) setLoading(true);
        setLoading(true);
        // setIsFetching(true);

        const [thresholdsRes, recipientsRes, dataRes] = await Promise.all([
          apiService.get("thresholdsForUser", userId),
          apiService.get("recipients"),
          apiService.get("data"),
        ]);

        if (import.meta.env.DEV) {
          console.log("✅ API Data Fetched:", {
            thresholds: thresholdsRes.data,
            recipients: recipientsRes.data,
            data: dataRes.data
          });
        }

        setThresholds(Array.isArray(thresholdsRes.data) ? thresholdsRes.data : []);
        setRecipients(Array.isArray(recipientsRes.data) ? recipientsRes.data : []);
        setDataItems(Array.isArray(dataRes.data) ? dataRes.data : []);
      } catch (err) {
        console.error("❌ API Fetch Error:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
        // setInitialLoad(false);
        // setIsFetching(false);
      }
    });

    if (import.meta.env.DEV) {
      console.log("🔍 Fetching data...");
    }
    fetchData();
  }, [userId, thresholds.length]);

  const availableDataItems = useMemo(() => {
    if (!Array.isArray(dataItems) || !Array.isArray(thresholds)) {
      return [];
    }
    return dataItems.filter((item) => !thresholds.some((threshold) => threshold.data_id === item.data_id));
  }, [dataItems, thresholds]);

  return { thresholds, recipients, dataItems, availableDataItems, loading, error, setThresholds };
};
