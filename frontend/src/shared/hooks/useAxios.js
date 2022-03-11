import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

axios.defaults.baseURL = 'http://localhost:5000/api';

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const controller = new AbortController();

  const fetchData = useCallback(
    async ({ url = '', method = 'get', data = null, token = null, headears = null }) => {
      setLoading(true);
      try {
        const fetchResult = await axios({ url, method, data, token, headears });
        return fetchResult;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearError = () => setError({});

  return { fetchData, loading, error, clearError };
};

export default useAxios;
