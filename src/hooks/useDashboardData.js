import { useState, useEffect, useMemo } from "react";
import { apiService } from "../services/api";

export const useDashboardData = (userId) => {
  const [thresholds, setThresholds] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        if (initialLoad || isFetching) setLoading(true);
        setIsFetching(true);

        const [thresholdsRes, recipientsRes, dataRes] = await Promise.all([
          apiService.get("thresholdsForUser", userId),
          apiService.get("recipients"),
          apiService.get("data"),
        ]);

        setThresholds(thresholdsRes.data);
        setRecipients(recipientsRes.data);
        setDataItems(dataRes.data);
      } catch (err) {
        console.error("❌ API Fetch Error:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
        setInitialLoad(false);
        setIsFetching(false);
      }
    })();
  }, [userId, thresholds.length]);

  const availableDataItems = useMemo(
    () => dataItems.filter((item) => !thresholds.some((threshold) => threshold.data_id === item.data_id)),
    [dataItems, thresholds]
  );

  return { thresholds, recipients, dataItems, availableDataItems, loading, error, setThresholds };
};
