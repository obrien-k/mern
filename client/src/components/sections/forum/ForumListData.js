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
    console.log('Forum response data from API:', response.data); // Log the response data
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
    console.log('Category response data from API:', response.data); // Log the response data
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
    console.log('Topic response data from API:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}

export async function fetchLastPost(postId, token) {
  try {
    const response = await axios.get(`/api/forums/posts/${postId}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw error;
  }
}


const ForumListData = () => {
  const [combinedData, setCombinedData] = useState([]);
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
      console.log('FORUM TOPICS');
        const forumsData = await fetchForums(token);
        const categoriesData = await fetchCategories(token);
        const topicsData = await fetchTopics(token);
      
        // Group topics by ForumID
        const topicsByForumId = topicsData.reduce((acc, topic) => {
            if (topic.ForumID._id) {
                const forumIdStr = topic.ForumID._id.toString();
                if (!acc[forumIdStr]) {
                    acc[forumIdStr] = [];
                }
                acc[forumIdStr].push(topic);
            }
            return acc;
        }, {});

        // Populate the last post data and calculate the number of topics and posts for each forum
        for (let forum of forumsData) {
            const forumTopics = topicsByForumId[forum._id] || [];
            console.log('FORUM TOPICS');
          console.log(forumTopics);
            // Checking if there are topics in the current forum
            if (forumTopics.length > 0) {
                const lastTopic = forumTopics[forumTopics.length - 1];
                console.log('LAST TOPICS');
                console.log(lastTopic);
                if (lastTopic) {
                  forum.LastPostTopicID = lastTopic._id;
                  const lastPostID = lastTopic.LastPostID;
                  
                  if (lastPostID) {
                    const lastPost = await fetchLastPost(lastPostID, token);
                        forum.LastPostBody = lastPost.Body;
                        forum.LastPostAuthorID = lastPost.AuthorID._id;
                        forum.LastPostID = lastPost._id;
                        forum.LastPostTime = lastPost.LastPostTime;
                        console.log(lastPost);
console.log('LAST POST');
                        console.log('LAST POST');
                    }
                }
            } else {
                forum.LastPostTopicID = null;
                forum.LastPostBody = null;
                forum.LastPostAuthorID = null;
                forum.LastPostID = null;
                forum.LastPostTime = null;
            }

            forum.NumTopics = forumTopics.length;
            forum.NumPosts = forumTopics.reduce((sum, topic) => sum + (topic.NumPosts || 0), 0);
        }

        const combinedData = categoriesData.map(category => {
            return {
                id: category._id,
                name: category.Name,
                forums: forumsData.filter(forum => forum.CategoryID && forum.CategoryID._id && forum.CategoryID._id.toString() === category._id.toString())
            };
        });

        setCombinedData(combinedData);
        setIsLoading(false);

    } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setErrorMessage('Error fetching data');
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

  // Pass the combinedData to the ForumList component instead of forums, categories, and topics
  return <ForumList combinedData={combinedData} />;
};

export default ForumListData;