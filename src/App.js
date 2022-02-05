import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import { HomePage } from './pages/homepage/homepage.component';

import './App.css';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop/hats' element={<HatsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
