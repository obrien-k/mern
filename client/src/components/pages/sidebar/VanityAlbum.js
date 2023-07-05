import React, { useEffect, useState } from 'react';

function VanityAlbum() {
    const [vanityAlbum, setVanityAlbum] = useState(null);

    useEffect(() => {
        // Fetch vanity album data here
        // For now, I'm setting dummy data

        setVanityAlbum({
            groupID: 1,
            name: 'Vanity Album Name',
            wikiImage: '../styles/layer_cake/logo.jpg',
            threadID: 1,
            title: 'Vanity Album Title',
            artists: 'Artist Name'
        });
    }, []);

    return (
        vanityAlbum && (
            <div className="box">
                <div className="head colhead_dark">
                    <strong>Vanity House</strong>
                    <a href={`forums.js?action=viewthread&threadid=${vanityAlbum.threadID}`}>[Discuss]</a>
                </div>
                <div className="center pad">
                    <a
                        href={`communities.js?id=${vanityAlbum.groupID}`}
                        className="tooltip"
                        title={`${vanityAlbum.artists} - ${vanityAlbum.name}`}
                    >
                        <img
                            src={vanityAlbum.wikiImage}
                            alt={`${vanityAlbum.artists} - ${vanityAlbum.name}`}
                            width="100%"
                        />
                    </a>
                </div>
            </div>
        )
    );
}

export default VanityAlbum;
