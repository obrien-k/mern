// Recommendations.js
import React, { useState, useEffect } from 'react';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [totalPoints, setTotalPoints] = useState(null);

    useEffect(() => {
        // Fetch recommendations data here
        // For now, I'm setting dummy data

        setRecommendations([
            {
                groupID: 1,
                userID: 1,
                username: 'John Doe',
                groupName: 'Group Name',
                tagList: 'tag1 tag2'
            },
            // ...more recommendations
        ]);

        setTotalPoints(1000);
    }, []);

    const renderTags = (tagList) => {
        const tags = tagList.split(' ').map(tag => tag.replace('_', '.'));
        return (
            <div className="tags">
                {tags.map((tag, index) => (
                    tag !== 'vanity.house' && (
                        <a key={index} href={`communities.js?action=basic&taglist=${tag}`}>{tag}</a>
                    )
                ))}
            </div>
        );
    };

    return (
        <div>
            {recommendations.length >= 4 && (
                <div className="box" id="recommended">
                    <div className="head colhead_dark">
                        <strong>Latest Vanity House additions</strong>
                    </div>
                    <table className="torrent_table hidden" id="vanityhouse">
                        {recommendations.map((recommendation, index) => (
                            <tr key={index}>
                                <td>
                                    <a href={`communities.js?id=${recommendation.groupID}`}>{recommendation.groupName}</a>
                                    {' '} (by {recommendation.username})
                                    {renderTags(recommendation.tagList)}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
}

export default Recommendations;
