import React from 'react';

function NewsItem(props) {
    const { title, description, imageUrl, newsUrl } = props;
    return (
        <a href={newsUrl} target="_blank" rel="noreferrer" className="news-item-card">
            <img src={imageUrl} alt={title} />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}...</p>
            </div>
        </a>
    );
}

export default NewsItem;