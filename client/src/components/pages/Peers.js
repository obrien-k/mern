import React from 'react';

function Peers({ data }) {
    if (!data) return null;

    return (
        <div className="peers">
            <ul>
                <li>Peers: {data.count}</li>
            </ul>
        </div>
    );
}

export default Peers;
