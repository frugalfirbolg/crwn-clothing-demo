import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
