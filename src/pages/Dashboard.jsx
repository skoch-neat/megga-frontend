import { useState, useEffect } from "react";
import { fetchThresholdById, fetchRecipients, fetchData } from "../services/api";
import ThresholdForm from "../components/ThresholdForm";

const Dashboard = ({ userId }) => {
  const [thresholds, setThresholds] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [goods, setGoods] = useState([]);
  const [viewMode, setViewMode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    loadData();
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadThresholds(), loadRecipients(), loadGoods()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadThresholds = async () => {
    try {
      const response = await fetchThresholdById(userId);
      setThresholds(response.data);
    } catch (error) {
      console.error("Error fetching thresholds:", error);
    }
  };

  const loadRecipients = async () => {
    try {
      const recipientsRes = await fetchRecipients();
      setRecipients(recipientsRes.data);
    } catch (error) {
      console.error("Error fetching recipients:", error);
    }
  };

  const loadGoods = async () => {
    try {
      const goodsRes = await fetchData();
      setGoods(goodsRes.data);
    } catch (error) {
      console.error("Error fetching goods/indicators:", error);
    }
  };

  if (!userId) return <h2>⏳ Waiting for user ID...</h2>;
  if (loading) return <h2>🔄 Loading Dashboard...</h2>;

  return (
    <div>
      <h1>Dashboard</h1>
      <nav className="threshold-nav">
        <button onClick={() => setViewMode("view")}>View Thresholds</button>
        <button onClick={() => setViewMode("create")}>Create Threshold</button>
      </nav>

      {viewMode === "view" && (
        <div>
          <h2>Your Current Thresholds</h2>
          {thresholds.length > 0 ? (
            <div className="threshold-list">
              {thresholds.map((threshold) => (
                <div key={threshold.threshold_id} className="threshold-box">
                  <p><strong>Good/Indicator:</strong> {threshold.name}</p>
                  <p><strong>Threshold Value:</strong> {threshold.threshold_value}%</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No thresholds set.</p>
          )}
        </div>
      )}

      {viewMode === "create" && (
        <ThresholdForm
          mode="create"
          userId={userId}
          onSuccess={loadThresholds}
        />
      )}
    </div>
  );
};

export default Dashboard;
