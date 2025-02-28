import React, { useEffect } from 'react';

const AlertMessage = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      zIndex: 1000,
      textAlign: 'center',
      maxWidth: '80%'
    }}>
      {message}
    </div>
  );
};

export default AlertMessage;
