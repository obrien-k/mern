import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModBar = () => {
  const [modBar, setModBar] = useState([]);

  useEffect(() => {
    axios.get('/api/tools')
      .then(response => {
        setModBar(response.data.modBar);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {modBar.map((item, index) => (
        <a key={index} href="#">{item}</a>
      ))}
    </div>
  );
};

export default ModBar;
