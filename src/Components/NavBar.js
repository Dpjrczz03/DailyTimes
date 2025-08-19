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
