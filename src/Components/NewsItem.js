import React from 'react';

function NewsItem(props) {
    const cardcolor2=props.cardcolor1
    return (

        <div>
            <a href={props.newsUrl} target="_blank">
                <div className="card " style={cardcolor2}>

                    <img
                        src={props.imageUrl}
                        height="180"
                        className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}.</h5>
                        <p className="card-text">{props.description}...</p>
                        {/*<a href={props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>*/}
                    </div>

                </div>
            </a>
        </div>
    );
}

export default NewsItem;