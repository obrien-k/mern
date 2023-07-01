import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ForumList from './ForumList';

export async function fetchForums(token) {
  try {
    const response = await axios.get('/api/forums', {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log('Response data from API:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    throw error;
  }
}

export async function fetchCategories(token) {
  try {
    const response = await axios.get('/api/forums/categories', {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log('Response data from API:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchTopics(token) {
  try {
    const response = await axios.get('/api/forums/topics', {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log('Response data from API:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}

const ForumListData = () => {
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state) => state.auth.token); // Select the token from the Redux store

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  async function fetchData() {
    try {
      const forumsData = await fetchForums(token);
      const categoriesData = await fetchCategories(token);
      // Set the fetched data in component state
      setForums(forumsData);
      setCategories(categoriesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('An error occurred while fetching data.');
      setIsLoading(false);
    }
  }

  if (!token) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return <ForumList forums={forums} categories={categories} />;
};

export default ForumListData;
