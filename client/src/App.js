import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Header from './components/header';
import Hero from './layouts/hero';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Hero />
        <Routes>
          <Route path="/summerize" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
