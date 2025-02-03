import React, { useState } from "react";
import { createThreshold } from "../services/api";
import "./ThresholdForm.css";

const ThresholdForm = ({ mode, userId, authToken, recipients, goods, onSuccess }) => {
  const [dataId, setDataId] = useState("");
  const [thresholdValue, setThresholdValue] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [notifyUser, setNotifyUser] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!dataId || !thresholdValue || selectedRecipients.length === 0) {
      setMessage({ type: "error", text: "Please fill out all required fields." });
      return;
    }

    try {
      await createThreshold(
        {
          userId: userId,
          dataId: dataId,
          thresholdValue: parseFloat(thresholdValue),
          notifyUser: notifyUser,
          recipients: selectedRecipients,
        },
        authToken
      );

      setMessage({ type: "success", text: "Threshold created successfully!" });
      onSuccess();
    } catch (err) {
      console.error("Error creating threshold:", err);
      setMessage({ type: "error", text: "An error occurred while creating the threshold." });
    }
  };

  return (
    <form className="threshold-form" onSubmit={handleSubmit}>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}

      <label>
        Select Good/Indicator:
        <select value={dataId} onChange={(e) => setDataId(e.target.value)}>
          <option value="">-- Select --</option>
          {goods.map((good) => (
            <option key={good.data_id} value={good.data_id}>{good.name}</option>
          ))}
        </select>
      </label>

      <label>
        Threshold Value (%):
        <input type="number" value={thresholdValue} onChange={(e) => setThresholdValue(e.target.value)} />
      </label>

      <label>
        Select Recipients:
        <select
          className="threshold-recipients"
          multiple
          value={selectedRecipients}
          onChange={(e) =>
            setSelectedRecipients([...e.target.selectedOptions].map((o) => o.value))
          }
        >
          {recipients.map((r) => (
            <option key={r.recipient_id} value={r.recipient_id}>{r.name}</option>
          ))}
        </select>
      </label>

      <label>
        <input type="checkbox" checked={notifyUser} onChange={(e) => setNotifyUser(e.target.checked)} />
        Notify me when triggered
      </label>

      <button type="submit">Create Threshold</button>
    </form>
  );
};

export default ThresholdForm;
