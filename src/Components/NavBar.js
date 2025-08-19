import React, {Component, useState} from 'react'

import React, { useState, useEffect } from 'react';

const newsCategories = [
    "Technology", "Business", "Health", "Science", "Sports", "Entertainment",
    "Apple", "Tesla", "Bitcoin", "Politics", "World", "India"
];

const NavBar = (props) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { setQuery } = props;
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.length > 0) {
            const filteredSuggestions = newsCategories.filter(cat =>
                cat.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setQuery(suggestion);
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
        <div className="navbar-container">
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">DailyTimes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://github.com/Dpjrczz03/DailyTimes" target="_blank" rel="noreferrer">About</a>
                            </li>
                        </ul>
                        <button className="btn-dark-mode" onClick={handleDarkClick}>
                            <i className={isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                        </button>
                        <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
                            <div className="search-wrapper">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search News..."
                                    onChange={handleInputChange}
                                    aria-label="Search"
                                    value={inputValue}
                                />
                                {suggestions.length > 0 && (
                                    <ul className="suggestions-list">
                                        {suggestions.map(suggestion => (
                                            <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button className="btn btn-search" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default NavBar;
