import React from "react";
import "./RecipientsModal.css";

const RecipientsModal = ({ recipients, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Recipients</h2>
        {recipients.length > 0 ? (
          <ul>
            {recipients.map((recipient, index) => (
              <li key={recipient.recipient_id || index}> {/* ✅ Ensure a unique key */}
                {recipient.designation ? `${recipient.designation} ` : ""}
                {recipient.first_name} {recipient.last_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipients assigned.</p>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecipientsModal;