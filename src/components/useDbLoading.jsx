// src/components/useDbLoading.jsx
import { useState } from 'react';

export const useDbLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const stopLoading = () => setIsLoading(false);
  const setLoadingError = (err) => {
    setError(err);
    setIsLoading(false);
  };

  return { isLoading, error, stopLoading, setLoadingError };
};