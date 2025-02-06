import React from "react";
import propTypes from 'prop-types';
import "./RecipientsModal.css";

const RecipientsModal = ({ recipients, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Recipients</h2>
        {recipients.length > 0 ? (
          <ul>
            {recipients.map((recipient, index) => (
              <li key={recipient.recipient_id || `${recipient.first_name}-${recipient.last_name}-${index}`}>
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

RecipientsModal.propTypes = {
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      recipient_id: PropTypes.string,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      designation: PropTypes.string,
    })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecipientsModal;