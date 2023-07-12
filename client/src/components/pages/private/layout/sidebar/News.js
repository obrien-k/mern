// News.js
import React, { useState, useEffect } from 'react';

function NewsItem({ newsItem, isAdmin }) {
    const [isHidden, setIsHidden] = useState(false);

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div id={`news${newsItem.newsID}`} className="box news_post">
            <div className="head">
                <strong>{newsItem.title}</strong>
                {isAdmin && (
                    <span> - <a href={`tools.php?action=editnews&id=${newsItem.newsID}`} className="brackets">Edit</a></span>
                )}
                <span style={{ float: 'right' }}>
                    <a href="#" onClick={toggleHidden} className="brackets">{isHidden ? 'Show' : 'Hide'}</a>
                </span>
            </div>
            {!isHidden && (
                <div id={`newsbody${newsItem.newsID}`} className="pad">
                    {newsItem.body}
                </div>
            )}
        </div>
    );
}

function News() {
    const [news, setNews] = useState([]);
    const newsCount = 5; // Set this to the desired maximum number of news items to be displayed
    const isAdmin = true; // This should be determined based on user permissions.

    useEffect(() => {
        // Fetch news data here
        // For now, I'm setting dummy data

        setNews([
            {
                newsID: 1,
                title: 'News Title',
                body: 'News Body',
                newsTime: '2023-06-26'
            },
            // ...more news items
        ]);
    }, []);

    return (
        <div>
            {news.slice(0, newsCount).map((newsItem, index) => (
                <NewsItem key={index} newsItem={newsItem} isAdmin={isAdmin} />
            ))}
        </div>
    );
}

export default News;
