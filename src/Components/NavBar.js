import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import Spinner from './Spinner';

const NavBar = (props) => {
    const { setQuery } = props;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);

    const debouncedSearchTerm = useDebounce(inputValue, 500);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setSuggestionsLoading(true);
            const apiKey = process.env.REACT_APP_NEWS_API_KEY;
            // Using a different endpoint for suggestions might be better, but for now, 'everything' will work.
            const url = `https://newsapi.org/v2/everything?q=${debouncedSearchTerm}&apiKey=${apiKey}&pageSize=5`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.articles) {
                        setSuggestions(data.articles);
                    } else {
                        setSuggestions([]);
                    }
                    setSuggestionsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching suggestions:", error);
                    setSuggestionsLoading(false);
                    setSuggestions([]);
                });
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSuggestionClick = (suggestionTitle) => {
        setInputValue(suggestionTitle);
        setQuery(suggestionTitle);
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(inputValue);
        setSuggestions([]);
    };

    const handleDarkClick = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a className="navbar-brand" href="/">DailyTimes</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/Dpjrczz03/DailyTimes" target="_blank" rel="noreferrer">About</a>
                    </li>
                </ul>
                <div className="navbar-controls">
                    <form className="search-form" role="search" onSubmit={handleSubmit}>
                        <div className="search-wrapper">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search News..."
                                onChange={handleInputChange}
                                aria-label="Search"
                                value={inputValue}
                            />
                                {(suggestions.length > 0 || suggestionsLoading) && (
                                <ul className="suggestions-list">
                                        {suggestionsLoading ? (
                                            <div className="suggestion-loader">
                                                <Spinner />
                                            </div>
                                        ) : (
                                            suggestions.map(suggestion => (
                                                <li key={suggestion.url} onClick={() => handleSuggestionClick(suggestion.title)}>
                                                    <span className="suggestion-title">{suggestion.title}</span>
                                                    <span className="suggestion-source">{suggestion.source.name}</span>
                                                </li>
                                            ))
                                        )}
                                </ul>
                            )}
                        </div>
                    </form>
                    <button className="btn-dark-mode" onClick={handleDarkClick}>
                        <i className={isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                    </button>
                </div>
            </div>
        </nav>
    )

}

export default NavBar;
