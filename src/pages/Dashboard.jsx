import { useState } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import { apiService } from "../services/api";
import Button from "../components/Button";
import Message from "../components/Message";
import RecipientsModal from "../components/RecipientsModal";
import ThresholdForm from "../components/ThresholdForm";
import "./Dashboard.css";

const Dashboard = ({ userId }) => {
  const { thresholds, recipients, dataItems, availableDataItems, loading, error, setThresholds } = useDashboardData(userId);
  const [viewMode, setViewMode] = useState(null);
  const [editingThreshold, setEditingThreshold] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedThresholdRecipients, setSelectedThresholdRecipients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewRecipients = async (recipientIds) => {
    if (!recipientIds.length) {
      setSelectedThresholdRecipients([]);
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await apiService.get("recipients");
      const allRecipients = response.data;

      const filteredRecipients = allRecipients.filter((recipient) =>
        recipientIds.includes(recipient.recipient_id)
      );

      setSelectedThresholdRecipients(filteredRecipients);
      setIsModalOpen(true);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("❌ Error fetching recipient details:", error);
      }
      setSelectedThresholdRecipients([]);
      setIsModalOpen(true);
    }
  };

  const handleEditThreshold = (threshold) => {
    setEditingThreshold(threshold);
    setViewMode("edit");
  };

  const handleDeleteThreshold = async (thresholdId) => {
    if (!window.confirm("Are you sure you want to delete this threshold?")) return;

    try {
      await apiService.delete("threshold", thresholdId);
      setSuccessMessage("✅ Threshold deleted successfully!");
      setThresholds((prev) => prev.filter((t) => t.threshold_id !== thresholdId));
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("❌ Error deleting threshold:", error);
      }
    }
  };

  const handleDeleteAllThresholds = async () => {
    if (!window.confirm("Are you sure you want to delete ALL thresholds? This action CANNOT be undone!")) return;

    try {
      await apiService.delete("thresholdsForUser", userId);
      setSuccessMessage("✅ All thresholds deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setThresholds([]);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("❌ Error deleting all thresholds:", error);
      }
    }
  };

  const handleSuccess = async (message, threshold) => {
    setSuccessMessage(message);

    if (threshold) {
      setThresholds((prev) => {
        const exists = prev.some(t => t.threshold_id === threshold.threshold_id);

        if (exists) {
          return prev.map(t =>
            t.threshold_id === threshold.threshold_id
              ? { ...t, threshold_value: threshold.thresholdValue, name: t.name, notify_user: threshold.notify_user, recipients: threshold.recipients }
              : t
          );
        } else {
          return [...prev, {
            ...threshold,
            name: dataItems.find(item => item.data_id === threshold.dataId)?.name || "Unknown",
            threshold_value: threshold.thresholdValue || 0,
            notify_user: threshold.notify_user,
            recipients: threshold.recipients || [],
          }];
        }
      });
    }

    setViewMode("view");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div>
      <nav className="threshold-nav">
        <Button onClick={() => setViewMode("view")}>View Thresholds</Button>

        {/* ✅ Hide "Create Threshold" when no available items */}
        {availableDataItems.length > 0 && (
          <Button onClick={() => setViewMode("create")}>Create Threshold</Button>
        )}

        <Button onClick={handleDeleteAllThresholds}>Delete All</Button>
      </nav>

      <Message type="error">{error}</Message>
      <Message type="success">{successMessage}</Message>

      {loading && <p>Loading...</p>}

      {viewMode === "view" && thresholds.length > 0 ? (
        <div className="threshold-list">
          {thresholds.map((threshold) => (
            <div key={threshold.threshold_id} className="threshold-box">
              <p><strong>{threshold.name}</strong></p>
              <p><strong>Threshold:</strong> {threshold.threshold_value}%</p>
              <p><strong>Notify Me:</strong> {threshold.notify_user ? "Yes" : "No"}</p>
              <Button onClick={() => handleEditThreshold(threshold)}>Edit</Button>
              <Button onClick={() => handleDeleteThreshold(threshold.threshold_id)}>Delete</Button>
              <Button onClick={() => handleViewRecipients(threshold.recipients)}>
                View Recipients ({threshold.recipients.length}) {/* ✅ Displays recipient count */}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        viewMode === "view" && <Message type="info">No thresholds set.</Message>
      )}

      {(viewMode === "create" || viewMode === "edit") && (
        <ThresholdForm
          mode={viewMode}
          userId={userId}
          recipients={recipients}
          dataItems={dataItems}
          thresholds={thresholds}
          existingThreshold={viewMode === "edit" ? editingThreshold : null}
          onSuccess={handleSuccess}
          setViewMode={setViewMode}
          setThresholds={setThresholds}
        />
      )}

      {/* ✅ Modal for Viewing Recipients */}
      {isModalOpen && (
        <RecipientsModal
          recipients={selectedThresholdRecipients}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;