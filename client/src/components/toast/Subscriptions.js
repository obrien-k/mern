import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subscriptions = ({userId}) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [commentSubscriptions, setCommentSubscriptions] = useState([]);
    const [hasNewSubscriptions, setHasNewSubscriptions] = useState(false);
    
    useEffect(() => {
        fetchSubscriptions();
        fetchCommentSubscriptions();
        checkNewSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            
            const response = await axios.get(`/api/subscriptions/get-subscriptions?userId=${userId}`);
            setSubscriptions(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    const fetchCommentSubscriptions = async () => {
        try {
            const response = await axios.get(`/api/subscriptions/get-comment-subscriptions?userId=${userId}`);
            setCommentSubscriptions(response.data);
        } catch (error) {
            console.error('Error fetching comment subscriptions:', error);
        }
    };

    const checkNewSubscriptions = async () => {
        try {
            const response = await axios.get(`/api/subscriptions/has-new-subscriptions?userId=${userId}`);
            setHasNewSubscriptions(response.data);
        } catch (error) {
            console.error('Error checking for new subscriptions:', error);
        }
    };
    return (
      <div>
          <h2>Subscriptions</h2>
          <ul>
              {subscriptions.map(subscription => (
                  <li key={subscription.id}>{subscription.name}</li>
              ))}
          </ul>
          <h2>Comment Subscriptions</h2>
          <ul>
              {commentSubscriptions.map(commentSubscription => (
                  <li key={commentSubscription.id}>{commentSubscription.name}</li>
              ))}
          </ul>
      </div>
  );
  
};

export default Subscriptions;
