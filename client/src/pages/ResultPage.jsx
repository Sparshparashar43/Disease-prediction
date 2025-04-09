import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const [cardData, setCardData] = useState({
        title: "Unknown Disease",
        description: "Loading...", // Default description
        similarDisease: ["Loading...", "Loading..."]
    });

    useEffect(() => {
        if (location.state && location.state.DiseaseName && location.state.similarDisease) {
            const disease = location.state.DiseaseName.toUpperCase();
            const search = "tell me about " + disease + " in 40 words";
            const similar1 = location.state.similarDisease[1];
            const similar2 = location.state.similarDisease[2];


            const fetchData = async() => {
                try {
                    const response = await fetch('https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'X-RapidAPI-Key': import.meta.env.VITE_OPENAI_API_KEY,
                            'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
                        },
                        body: JSON.stringify({
                            "model": "gpt-3.5-turbo",
                            "messages": [{
                                "role": "user",
                                "content": search
                            }]
                        })
                    });

                    if (response.ok) {
                        const responseObject = await response.json();
                        const content = responseObject.choices[0].message.content;
                        setCardData({ title: disease, description: content, similarDisease: [similar1, similar2] });
                    } else {
                        console.error('Network response was not ok');
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        }
    }, [location.state]);

    return ( <
        Card {...cardData }
        />

    );
};

export default ResultPage;