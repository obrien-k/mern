import React from 'react';

function Snatches({ data }) {
    if (!data) return null;

    return (
        <div className="snatches">
            <ul>
                <li>Snatches: {data.count}</li>
            </ul>
        </div>
    );
}

export default Snatches;
