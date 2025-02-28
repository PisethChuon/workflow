import React, { useEffect, useRef, useState } from "react";
import FormViewer from "../utils/formViewerWrapper";
import PopupActions from "./Actionsfunction";
import styles from "../styles/formStyles.module.css";

// Updated icon for all states to use form icon
const StateIcons = {
  submission: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.headerIcon}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 4C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20M20 18V8H4V18H20M4 6V8H20V6H4M6 10H18V12H6V10M6 14H14V16H6V14Z"
      />
    </svg>
  ),
  duty_sgt_verify: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.headerIcon}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 4C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20M20 18V8H4V18H20M4 6V8H20V6H4M6 10H18V12H6V10M6 14H14V16H6V14Z"
      />
    </svg>
  ),
  hod_review: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.headerIcon}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 4C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20M20 18V8H4V18H20M4 6V8H20V6H4M6 10H18V12H6V10M6 14H14V16H6V14Z"
      />
    </svg>
  ),
  requestor_rework: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.headerIcon}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20 4C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20M20 18V8H4V18H20M4 6V8H20V6H4M6 10H18V12H6V10M6 14H14V16H6V14Z"
      />
    </svg>
  ),
};

export default function ActionFormPopup({
  visible,
  formConfig,
  onSubmit,
  onClose,
  popupType,
}) {
  const formContainerRef = useRef(null);
  const [formInstance, setFormInstance] = useState(null);

  // Add handlers
  const handleAction = (action, data) => {
    onSubmit({ action, values: data });
  };

  const handleDirectAction = (action) => {
    onSubmit({ action });
  };

  useEffect(() => {
    if (visible && formConfig && formContainerRef.current) {
      const viewer = new FormViewer({
        container: formContainerRef.current,
        schema: formConfig
      });

      viewer.init().then(instance => {
        setFormInstance(instance);
        
        // Listen for form submission
        instance.on('submit', (event) => {
          onSubmit(event);
          onClose();
        });
      });

      return () => {
        viewer.destroy();
        setFormInstance(null);
      };
    }
  }, [visible, formConfig, onSubmit, onClose]);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.stateHeader}>
          {StateIcons[popupType] || StateIcons.submission} {/* Add icon */}
          <h2 className={styles.stateTitle}>{popupType.replace(/_/g, " ")}</h2>
        </div>
        <div ref={formContainerRef} className={styles.formContainer} />
        <div className={styles.actionBar}>
          <PopupActions
            popupType={popupType}
            onAction={handleAction}
            onDirectAction={handleDirectAction}
          />
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
