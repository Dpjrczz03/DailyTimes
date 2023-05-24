import './App.css';

import React, {Component, useState} from 'react'
import NavBar from './Components/NavBar';
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";
import Footer from "./Components/Footer";


const App = () => {
    const [progress, setProgress]=useState(0)
    const[cardcolor,setCardcolor]=useState({
        backgroundColor: "#eeeeee",
        color: "black",
        height: "380px"
    })
    const [query, setQuery] = useState('Top');
    const [style, setStyle]=useState({
        backgroundColor: "white"
    })
    return (
        <div>
            <NavBar setQuery={setQuery} setStyle={setStyle} setCardcolor={setCardcolor}/>
            <LoadingBar
                color='#1e6640'
                progress={progress}
                // onLoaderFinished={() => setProgress(0)}
            />
            <News query={query} setProgress={setProgress} style={style} cardcolor={cardcolor}/>
            {/*<Footer/>*/}
        </div>
    )

}


export default App;
