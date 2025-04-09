import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./pages/Header";
import ResultPage from "./pages/ResultPage";

function App() {
    return ( <
        BrowserRouter >
        <
        Header / >
        <
        Routes >
        <
        Route path = "/"
        element = { < HomePage / > }
        /> <
        Route path = "/result"
        element = { < ResultPage / > }
        /> <
        /Routes> <
        /BrowserRouter>
    );
}

export default App;