import React, { useEffect, useState } from 'react';

function FeaturedAlbum() {
    const [featuredAlbum, setFeaturedAlbum] = useState(null);

    useEffect(() => {
        // Fetch featured album data here
        // For now, I'm setting dummy data

        setFeaturedAlbum({
            groupID: 1,
            name: 'Album Name',
            wikiImage: 'path/to/image.jpg',
            threadID: 1,
            title: 'Album Title',
            artists: 'Artist Name'
        });
    }, []);

    return (
        featuredAlbum && (
            <div className="box">
                <div className="head colhead_dark">
                    <strong>Album of the Month</strong>
                    <a href={`forums.php?action=viewthread&threadid=${featuredAlbum.threadID}`}>[Discuss]</a>
                </div>
                <div className="center pad">
                    <a
                        href={`torrents.php?id=${featuredAlbum.groupID}`}
                        className="tooltip"
                        title={`${featuredAlbum.artists} - ${featuredAlbum.name}`}
                    >
                        <img
                            src={featuredAlbum.wikiImage}
                            alt={`${featuredAlbum.artists} - ${featuredAlbum.name}`}
                            width="100%"
                        />
                    </a>
                </div>
            </div>
        )
    );
}

export default FeaturedAlbum;
