import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return ( <
        header className = "bg-emerald-500 text-white py-4 shadow-md mb-4" >
        <
        div className = "container mx-auto flex items-center justify-center" >
        <
        Link to = { '/' } >
        <
        h1 className = "text-3xl font-bold" > DISEASE PREDICTOR < /h1> <
        /Link> <
        /div> <
        /header>
    );
};

export default Header;