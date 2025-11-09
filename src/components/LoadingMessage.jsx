// src/components/LoadingMessage.jsx
import React, { useState, useEffect } from 'react';

const LoadingMessage = ({ isLoading, customMessage }) => {
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowDelayMessage(true), 2000); // Show delay message after 2 seconds
    } else {
      setShowDelayMessage(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="text-center p-4 bg-blue-100 rounded-lg shadow-md">
      <p className="text-blue-800 font-medium">
        {customMessage || 'Loading...'}
        {showDelayMessage && (
          <span className="block mt-2 text-sm text-blue-600">
            The current version of We Are The Church is using a FREE online database which means sometimes there are slow spin ups or load times... usually not very long.. be patient .. dont leave just yet!
          </span>
        )}
      </p>
    </div>
  );
};

export default LoadingMessage;