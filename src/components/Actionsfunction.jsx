import React, { useState } from "react";
import styles from "../styles/actionButtons.module.css";

export default function PopupActions({
  state,
  popupType,
  handleAction,
  onAction,
  onDirectAction,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const matches = (val) =>
    state?.matches ? state.matches(val) : popupType === val;
  const _handleAction = handleAction || onAction;

  const handleClick = (action) => {
    if (onDirectAction) {
      onDirectAction(action);
    } else {
      _handleAction(action);
    }
    setIsOpen(false);
  };

  const getActionButtons = () => {
    if (matches("duty_sgt_verify")) {
      return [
        { action: "VERIFY", label: "Verify" },
        { action: "REJECT", label: "Reject" },
        { action: "REWORK", label: "Request Rework" },
      ];
    } else if (matches("hod_review")) {
      return [
        { action: "REVIEW", label: "Review" },
        { action: "REJECT", label: "Reject" },
        { action: "REWORK", label: "Request Rework" },
      ];
    } else if (matches("requestor_rework")) {
      return [
        { action: "RESUBMIT", label: "Resubmit" },
        { action: "CANCEL", label: "Cancel" },
      ];
    }
    return [];
  };

  if (matches("submission")) {
    return (
      <button
        className={styles.dropdownButton}
        onClick={() => handleClick("SUBMIT")}
      >
        Submit
      </button>
    );
  }

  const actions = getActionButtons();
  if (actions.length === 0) return null;

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Actions ▼
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {actions.map(({ action, label }) => (
            <button
              key={action}
              className={styles.actionButton}
              onClick={() => handleClick(action)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
