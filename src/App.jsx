import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import AuctionList from './pages/AuctionList';

const App = () => (
  <BrowserRouter>
    <nav>
      <Link to="auction-list">Get auctions</Link>
    </nav>
    <Routes>
      <Route path="/" exact element={<div>majom</div>} />
      <Route path="auction-list" element={<AuctionList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
