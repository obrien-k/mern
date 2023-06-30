import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ForumList from './ForumList';

const ForumListData = () => {
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state) => state.auth.token); // Select the token from the Redux store

  useEffect(() => {
    if (token) {
      fetchForums(token);
    }
  }, [token]);

  const fetchForums = async (token) => {
    try {
      const response = await axios.get('/api/forums', {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Response data from API:', response.data); // Log the response data
      setForums(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 'An error occurred while fetching forums.',
      );
      setIsLoading(false);
    }
  };
  

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>Error: {errorMessage}</div>
      ) : (
        <ForumList forums={forums} />
      )}
    </div>
  );
};

export default ForumListData;
