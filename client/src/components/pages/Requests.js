import React from 'react';

function Requests({ data }) {
    if (!data) return null;

    return (
        <div className="requests">
            <ul>
                <li>Requests: {data.count}</li>
            </ul>
        </div>
    );
}

export default Requests;
