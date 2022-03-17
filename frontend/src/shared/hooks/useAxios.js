import axios from 'axios';
import { useState, useEffect, useCallback, useContext } from 'react';

import AuthContext from '../context/authContext';

axios.defaults.baseURL = 'http://localhost:5000/api';

const useAxios = () => {
  const authContext = useContext(AuthContext);

  if (authContext.user && authContext.isLoggedIn)
    axios.defaults.headers.common['Authorization'] = `Authorization ${authContext.user.token}`;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const controller = new AbortController();

  const fetchData = useCallback(
    async ({ url = '', method = 'get', data = null, token = null, headears = null }) => {
      setLoading(true);
      try {
        const fetchResult = await axios({ url, method, data, headears });
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
