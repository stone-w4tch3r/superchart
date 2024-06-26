import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import ChartPage from "./chartModule/ChartPage.tsx";

const App: React.FC = () => {
    return <Router>
        <Routes>
            <Route path="/" element={<ChartPage/>}/>
        </Routes>
    </Router>;
};

export default App;
