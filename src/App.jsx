import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import MainWebsite from './MainWebsite';

const App = () => {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    navigate('/interactive');
  };

  return (
      <Routes>
        <Route path="/" element={<LandingPage onExploreClick={handleExploreClick} />} />
        <Route path="/interactive" element={<MainWebsite />} />
      </Routes>
  );

}; 

export default App;
