import React, {Component, useState} from 'react'

const NavBar = (props) => {
    const [darkclass,setDarkclass]=useState("fa-solid fa-moon")
    const setQuery = props.setQuery;
    const setCardcolor=props.setCardcolor
    const [inputValue, setInputValue] = useState('');
    const [c, setC] = useState(0)
    const[btnc, setBtnc]=useState({
        backgroundColor: "#2b3035"

        })
    const handleSubmit = (e) => {

        e.preventDefault();
        setQuery(inputValue);


    }
    const handleDarkClick = (e) => {
        setC(c + 1)
        if (c % 2 === 0) {
            setDarkclass("fa-solid fa-sun")
            props.setStyle({

                backgroundColor: "#232323"


            })
            setCardcolor({
                backgroundColor: "#1f1f1f",
                color:"white",
                height: "380px"
            })

        }
        else{
            setDarkclass("fa-solid fa-moon")
            props.setStyle({

                backgroundColor: "white"


            })
            setCardcolor({
                backgroundColor: "#eeeeee",
                color: "black",
                height: "380px"
            })

        }

    }


    return (
        <div className="faaltu">
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">DailyTimes
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">About</a>
                            </li>

                        </ul>
                        <button className="btn btn-outline-success darkbtn" style={btnc} onClick={handleDarkClick}><i
                            className={darkclass}></i></button>
                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Enter Category"
                                   onChange={(e) => setInputValue(e.target.value)} aria-label="Search"
                                   value={inputValue}/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default NavBar;
