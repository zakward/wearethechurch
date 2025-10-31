import React, { useState, useEffect } from 'react';
import { Loader2, Database, Clock } from 'lucide-react';

// Universal loading component for database operations
export const DbLoadingState = ({ 
  isLoading, 
  error, 
  children,
  minLoadTime = 2000, // Show message for at least 2 seconds
  customMessage = null 
}) => {
  const [showSpinUpMessage, setShowSpinUpMessage] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    let intervalTimer;
    
    if (isLoading) {
      // Show spin-up message after 1 second of loading
      timer = setTimeout(() => {
        setShowSpinUpMessage(true);
      }, 1000);

      // Track elapsed time
      intervalTimer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      setShowSpinUpMessage(false);
      setElapsedTime(0);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
    };
  }, [isLoading]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Connection Error
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message || 'Unable to connect to the database. Please try again.'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="relative inline-block mb-6">
            <Database className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin absolute -top-2 -right-2" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {customMessage || 'Connecting to Database'}
          </h3>
          
          {showSpinUpMessage && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                <Clock className="w-5 h-5" />
                <p className="font-medium">Please be patient...</p>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We're using a free-tier database that may take 30-60 seconds to wake up from sleep mode. 
                Your request is being processed—nothing is broken!
              </p>
              {elapsedTime > 5 && (
                <p className="text-gray-500 dark:text-gray-500 text-xs">
                  Waiting for {elapsedTime} seconds...
                </p>
              )}
            </div>
          )}

          {!showSpinUpMessage && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Loading your data...
            </p>
          )}
        </div>
      </div>
    );
  }

  return children;
};

// Hook for managing database loading states
export const useDbLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const setLoadingError = (err) => {
    setError(err);
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError
  };
};

// Example usage in a page component
export const ExampleUsage = () => {
  const { isLoading, error, stopLoading, setLoadingError } = useDbLoading();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/your-endpoint');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
        stopLoading();
      } catch (err) {
        setLoadingError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <DbLoadingState isLoading={isLoading} error={error}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Your Content</h1>
        {/* Your actual page content here */}
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </DbLoadingState>
  );
};