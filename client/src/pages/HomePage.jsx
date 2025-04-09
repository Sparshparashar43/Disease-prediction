import React, { useState, useEffect } from "react";
import { Disease } from "../assets/Disease";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    // Initialize state to track selected diseases, searchText, and search results
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // Handle the selection of a disease
    const handleDiseaseSelect = (disease) => {
        setSelectedDiseases([...selectedDiseases, disease]);
        //console.log(selectedDiseases);
        setSearchText(""); // Clear searchText
    };

    // Handle the removal of a selected disease
    const handleDiseaseRemove = (disease) => {
        setSelectedDiseases(selectedDiseases.filter((item) => item !== disease));
    };

    // Handle the search input change
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    // Handle the submit button click
    const handleSubmit = async() => {
        try {
            const response = await fetch('https://moderndiseasedetectorbackend.onrender.com/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedDiseases }),
            });

            if (response.ok) {
                const data = await response.json();
                let DiseaseName = "Default Disease";
                let similarDisease;
                if (data.prediction) {
                    DiseaseName = data.prediction;
                    similarDisease = data.similarDisease
                }
                console.log(DiseaseName);
                navigate('/result', { state: { DiseaseName: DiseaseName, similarDisease: similarDisease } }); // Navigate to 'other-route' and pass data
                console.log('Data sent successfully!');
            } else {
                console.error('Some error is Comming as response');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        if (searchText) {
            const results = Disease.filter((disease) =>
                disease.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchResults(results.slice(0, 5)); // Display up to 5 matching diseases
        } else {
            // If searchText is empty, clear the search results
            setSearchResults([]);
        }
    }, [searchText]);

    return ( <
        div className = "bg-gray-100 p-4 rounded-lg w-1/2 mx-auto shadow-md" >
        <
        div className = "mb-4 flex" >
        <
        input type = "text"
        placeholder = "Enter your symptoms..."
        className = "w-full p-2 rounded-l-md bg-white focus:outline-none"
        value = { searchText }
        onChange = { handleSearchChange }
        /> <
        button className = "bg-emerald-500 text-white rounded-r-md p-2 hover:bg-emerald-600"
        onClick = { handleSubmit } >
        Submit <
        /button> <
        /div> {
            selectedDiseases.length > 0 && ( <
                div className = "mt-4" >
                <
                h2 className = "text-lg font-semibold text-gray-900" > Selected Symptoms: < /h2> <
                div className = "mt-2 space-x-2 flex flex-wrap" > {
                    selectedDiseases.map((disease, index) => ( <
                        div className = "bg-blue-100 py-2 px-4 rounded-full flex items-center"
                        key = { index } >
                        <
                        p className = "text-blue-500 mr-2" > { disease } < /p> <
                        button className = "text-red-500 font-bold cursor-pointer"
                        onClick = {
                            () => handleDiseaseRemove(disease) } >
                        X <
                        /button> <
                        /div>
                    ))
                } <
                /div> <
                /div>
            )
        } {
            searchResults.length > 0 && ( <
                ul role = "list"
                className = "space-y-2" > {
                    searchResults.map((disease, index) => ( <
                        li key = { index }
                        className = "py-3 cursor-pointer"
                        onClick = {
                            () => handleDiseaseSelect(disease) } >
                        <
                        p className = "text-sm font-semibold leading-5 text-gray-900" > { disease } <
                        /p> <
                        /li>
                    ))
                } <
                /ul>
            )
        } <
        /div>
    );
}