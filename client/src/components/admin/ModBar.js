import React, { useState, useEffect } from 'react';
import api from '../../utils/api'

const ModBar = () => {
  const [modBar, setModBar] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/tools') // Note the full URL
      .then(response => {
        setModBar(response.data.modBar);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load data.');
      });
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {modBar.map((item, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: item }} /> 
        // Note: be cautious with dangerouslySetInnerHTML
      ))}
    </div>
  );
};

export default ModBar;
