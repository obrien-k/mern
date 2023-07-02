// TODO 
// Not sure about this approach vs ForumListData
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ForumList from './ForumList';

export async function fetchForums() {
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
        <div>{forums}</div>
      )}
    </div>
  );
}

export async function fetchCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state) => state.auth.token); // Select the token from the Redux store

  useEffect(() => {
    if (token) {
      fetchCategories(token);
    }
  }, [token]);

  const fetchCategories = async (token) => {
    try {
      const response = await axios.get('/api/forums/categories', {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Response data from API:', response.data); // Log the response data
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 'An error occurred while fetching forum categories.',
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
        <div>{categories}</div>
      )}
    </div>
  );
}

export async function fetchTopics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state) => state.auth.token); // Select the token from the Redux store

  useEffect(() => {
    if (token) {
      fetchTopics(token);
    }
  }, [token]);

  const fetchTopics = async (token) => {
    try {
      const response = await axios.get('/api/forums/topics', {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Response data from API:', response.data); // Log the response data
      setTopics(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 'An error occurred while fetching forum topics.',
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
        <div>{topics}</div>
      )}
    </div>
  );
}



const ForumAPI = () => {

};

export default ForumAPI;
