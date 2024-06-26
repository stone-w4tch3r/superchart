import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import ChartPage from './chartModule/ChartPage.tsx';
import LandingPage from "./landing_example/LandingPage.tsx";

const App: React.FC = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<ChartPage/>}/>
            <Route path="/landing" element={<LandingPage/>}/>
        </Routes>
    </Router>;
};

export default App;
