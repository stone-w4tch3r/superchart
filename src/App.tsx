import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import ChartPage from './chartModule/ChartPage.tsx';
import Dashboard from "./dashboard_example/Dashboard.tsx";
import LandingPage from "./landing_example/LandingPage.tsx";

const App: React.FC = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<ChartPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/landing" element={<LandingPage/>}/>
        </Routes>
    </Router>;
};

export default App;
