import React from 'react';

function Collages({ data }) {
    if (!data) return null;

    return (
        <div className="collages">
            <ul>
                <li>Collages: {data.count}</li>
            </ul>
        </div>
    );
}

export default Collages;
