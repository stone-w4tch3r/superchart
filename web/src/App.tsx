import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import ChartPage from './chartModule/ChartPage.tsx';
import LandingPage from "./landing_example/LandingPage.tsx";
import ResponsiveCardGrid from "./chartModule/ResponsiveCardGrid.tsx";
import PricingPage from "./chartModule/PricingPage.tsx";
import DashboardPage from "./chartModule/DashboardPage.tsx";

const App: React.FC = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<ChartPage/>}/>
            <Route path="/landing" element={<LandingPage/>}/>
            <Route path="/cards" element={<ResponsiveCardGrid/>}/>
            <Route path="/pricing" element={<PricingPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
    </Router>;
};

export default App;
