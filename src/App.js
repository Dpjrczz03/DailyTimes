import './App.css';

import React, {Component, useState} from 'react'
import NavBar from './Components/NavBar';
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";
import Footer from "./Components/Footer";


const App = () => {
    const [progress, setProgress]=useState(0)
    const [query, setQuery] = useState('Top');

    return (
        <div>
            <NavBar setQuery={setQuery}/>
            <LoadingBar
                color='var(--primary-color)'
                progress={progress}
            />
            <News query={query} setProgress={setProgress}/>
            <Footer/>
        </div>
    )

}


export default App;
