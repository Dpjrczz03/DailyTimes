import React from 'react';

function Spinner(props) {
    return (

        <div className="lds-ring text-center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    );
}

export default Spinner;