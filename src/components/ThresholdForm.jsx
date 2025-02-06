import React, { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { apiService } from "../services/api";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Message from "../components/Message";
import "./ThresholdForm.css";

const ThresholdForm = ({ mode, userId, recipients, dataItems, existingThreshold, thresholds, onSuccess, setViewMode, setThresholds }) => {
  const isEditing = mode === "edit";
  const [dataId, setDataId] = useState(existingThreshold?.data_id || "");
  const [thresholdValue, setThresholdValue] = useState(existingThreshold?.threshold_value || "");
  const [selectedRecipients, setSelectedRecipients] = useState(existingThreshold?.recipients?.map(String) || []);
  const [notifyUser, setNotifyUser] = useState(existingThreshold?.notify_user || false);
  const [message, setMessage] = useState(null);
  const MESSAGE_TIMEOUT_MS = 3000;

  const availableDataItems = useMemo(
    () => dataItems.filter(item => !thresholds.some(threshold => threshold.data_id === item.data_id)),
    [dataItems, thresholds]
  );

  const hasNoChanges = () => {
    if (!isEditing || !existingThreshold) return false;

    const result =
      parseInt(thresholdValue) === existingThreshold.threshold_value &&
      notifyUser === existingThreshold.notify_user &&
      JSON.stringify([...selectedRecipients].sort()) === JSON.stringify([...existingThreshold.recipients.map(String)].sort());
    return result;
  };

  useEffect(() => {
    if (!isEditing) {
      setDataId("");
      setThresholdValue("");
      setSelectedRecipients([]);
      setNotifyUser(false);
      setMessage(null);
    }
  }, [isEditing]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, MESSAGE_TIMEOUT_MS);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (hasNoChanges()) {
      setMessage({ type: "error", text: "No changes detected. Please modify at least one field before saving." });
      return;
    }

    const parsedThreshold = parseInt(thresholdValue);
    if (!parsedThreshold || isNaN(parsedThreshold) || parsedThreshold <= 0 || selectedRecipients.length === 0) {
      setMessage({ type: "error", text: "Please fill out all required fields. Threshold cannot be set to zero." });
      return;
    }

    const payload = {
      userId,
      dataId: Number(dataId),
      thresholdValue: parseInt(thresholdValue),
      notify_user: Boolean(notifyUser),
      recipients: selectedRecipients.map(Number),
    };

    try {
      if (isEditing) {
        const response = await apiService.put("threshold", { id: existingThreshold.threshold_id, ...payload });
        if (!response.data) {
          throw new Error('Invalid response format');
        }

        const updatedThreshold = {
          ...existingThreshold,
          thresholdValue: payload.thresholdValue,
          notify_user: payload.notify_user,
          recipients: [...payload.recipients],
        };

        setThresholds((prev) =>
          prev.map((t) => (t.threshold_id === updatedThreshold.threshold_id ? updatedThreshold : t))
        );

        onSuccess(`✅ Threshold updated successfully!`, updatedThreshold);
      } else {
        const response = await apiService.post("threshold", payload);

        if (!response.data || !response.data.threshold_id) {
          throw new Error('Invalid response format');
        }

        const newThreshold = response.data;

        const formattedThreshold = {
          ...newThreshold,
          recipients: newThreshold.recipients || []
        };

        setThresholds((prev) => [...prev, formattedThreshold]);
        onSuccess(`✅ Threshold created successfully!`, formattedThreshold);
      }

      setViewMode("view");
    } catch (err) {
      // setMessage({ type: "error", text: "An error occurred while saving the threshold." });
      const errorMessage = err.response?.data?.message || err.message || "An error occurred while saving the threshold.";
      setMessage({ type: "error", text: errorMessage });
      console.error('Threshold save error:', err);
    }
  };

  return (
    <form
      className="threshold-form"
      onSubmit={handleSubmit}
      aria-label="Threshold Management Form"
    >
      {message && <Message type={message.type}>{message.text}</Message>}

      {!isEditing && (
        <label>
          Select Good/Indicator:
          <select
            value={dataId}
            onChange={(e) => setDataId(e.target.value)}
            aria-required="true"
          >
            <option value="">-- Select --</option>
            {availableDataItems.map((dataItem) => (
              <option key={dataItem.data_id} value={dataItem.data_id}>{dataItem.name}</option>
            ))}
          </select>
        </label>
      )}

      <FormInput
        label="Threshold Value (%)"
        type="number"
        value={thresholdValue}
        onChange={(e) => setThresholdValue(e.target.value)}
        step="any"
        aria-required="true"
      />

      <label>
        Select Recipients:
        <select
          multiple
          value={selectedRecipients}
          onChange={(e) => setSelectedRecipients([...e.target.selectedOptions].map(o => o.value))}
          aria-required="true"
          aria-label="Select one or more recipients"
        >
          {recipients.map((r) => (
            <option key={r.recipient_id} value={r.recipient_id}>
              {r.designation ? `${r.designation} ` : ""}{r.first_name} {r.last_name}
            </option>
          ))}
        </select>
      </label>

      <div className="threshold-checkbox-container">
        <label>
          <input type="checkbox" checked={notifyUser} onChange={(e) => setNotifyUser(e.target.checked)} />
          Notify me when triggered
        </label>
      </div>

      <Button type="submit">
        {isEditing ? "Save Changes" : "Submit New Threshold"}
      </Button>
    </form>
  );
};

ThresholdForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  userId: PropTypes.string.isRequired,
  recipients: PropTypes.arrayOf(PropTypes.shape({
    recipient_id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    designation: PropTypes.string,
  })).isRequired,
  dataItems: PropTypes.arrayOf(PropTypes.shape({
    data_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  existingThreshold: PropTypes.shape({
    threshold_id: PropTypes.number.isRequired,
    data_id: PropTypes.number.isRequired,
    threshold_value: PropTypes.number.isRequired,
    recipients: PropTypes.arrayOf(PropTypes.number).isRequired,
    notify_user: PropTypes.bool.isRequired,
  }),
  thresholds: PropTypes.array.isRequired,
  onSuccess: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  setThresholds: PropTypes.func.isRequired,
};

export default ThresholdForm;
