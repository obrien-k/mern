import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const ModBar = ({userId}) => {
  const [modBar, setModBar] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cancelToken = api.CancelToken.source();

    api.get('/tools', { cancelToken: cancelToken.token })
      .then(response => {
        setModBar(response.data.modBar);
      })
      .catch(error => {
        if (!api.isCancel(error)) {
          console.error(error);
          setError('Failed to load data.');
        }
      });

    return () => {
      cancelToken.cancel('Request canceled by cleanup'); //
    };
  }, []);

  return (
    <div className='modBar'>
      <div>
        {error && <div>{error}</div>}
        {modBar.map((item, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
        {/* Link to navigate to Toolbox component */}
        <Link to="/tools">Go to Toolbox</Link>
      </div>
    </div>
  );
};

export default ModBar;
