import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './chartModule/Home';
import Dashboard from "./dashboard_example/Dashboard.tsx";
import LandingPage from "./landing_example/LandingPage.tsx";

const App: React.FC = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/landing" element={<LandingPage/>}/>
        </Routes>
    </Router>;
};

export default App;
