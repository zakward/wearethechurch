// src/components/DbLoadingState.jsx
import React from 'react';
import LoadingMessage from './LoadingMessage.jsx';

const DbLoadingState = ({ isLoading, error, customMessage, children }) => {
  if (error) {
    return <p className="text-center text-red-500 p-8">Error: {error.message || 'Something went wrong. Please try again later.'}</p>;
  }
  if (isLoading) {
    return <LoadingMessage isLoading={isLoading} customMessage={customMessage} />;
  }
  return children;
};

export default DbLoadingState;