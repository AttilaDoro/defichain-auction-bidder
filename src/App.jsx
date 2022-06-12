import React, { useReducer } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Context from './state/context';
import reducer, { initialState } from './state/reducer';
import { GET_AUCTIONS_START, GET_AUCTIONS_FINISH, GET_AUCTIONS_ERROR, SET_CURRENT_BLOCK } from './state/actions';
import Home from './pages/Home';

const getState = (state, dispatch) => ({
  ...state,
  getAuctions: async (auctionNum, minMargin, minProfit) => {
    try {
      dispatch({ type: GET_AUCTIONS_START });
      // eslint-disable-next-line max-len
      const url = `http://localhost:4000/get-auction-list/${auctionNum}?minMarginPercentage=${minMargin}&minProfit=${minProfit}`;
      const response = await fetch(url);
      const auctions = await response.json();
      dispatch({ type: GET_AUCTIONS_FINISH, auctions });
    } catch (error) {
      dispatch({ type: GET_AUCTIONS_ERROR, error });
    }
  },
  getCurrentBlock: async () => {
    try {
      const url = 'https://ocean.defichain.com/v0/mainnet/stats';
      const response = await fetch(url);
      const stats = await response.json();
      const currentBlock = stats?.data?.count?.blocks;
      dispatch({ type: SET_CURRENT_BLOCK, currentBlock });
    } catch (error) {
      console.log(error);
    }
  },
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Context.Provider value={getState(state, dispatch)}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
};

export default App;
