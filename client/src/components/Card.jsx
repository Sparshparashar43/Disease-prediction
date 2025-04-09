import React from "react";


const Card = ({ title, description, similarDisease }) => {
    // Randomly choosing the image
    const randomImage = [
        "../../images/image1.jpeg",
        "../../images/image2.jpg",
        "../../images/image3.jpg",
        "../../images/image4.jpeg",
        "../../images/image5.jpeg",
        "../../images/image6.jpg",
    ]

    const randomIndex = Math.floor(Math.random() * randomImage.length); // Get a random index
    const selectedImage = randomImage[randomIndex]; // Get the image using the random index
    return ( <
        div className = "flex justify-center items-center" >
        <
        div className = "max-w-sm rounded overflow-hidden shadow-lg bg-white mt-1" >
        <
        img className = "w-full"
        src = { selectedImage }
        alt = "Your Image" /
        >
        <
        div className = "px-6 py-3" >
        <
        div className = "font-bold text-xl mb-2" > { title } < /div> <
        p className = "text-gray-700 text-base" > { description } < /p> <
        /div> <
        div className = "px-6" >
        <
        h3 className = "font-bold" > Similar Disease < /h3> <
        /div> <
        div className = "px-1 pt-3 pb-2" >
        <
        span className = "inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2" > { similarDisease[0] } <
        /span> <
        span className = "inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2" > { similarDisease[1] } <
        /span> <
        /div> <
        /div> <
        /div>
    );
};

export default Card;