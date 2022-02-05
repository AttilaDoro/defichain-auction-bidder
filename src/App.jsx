import React, { useReducer } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Context from './state/context';
import reducer, { initialState } from './state/reducer';
import { GET_AUCTIONS_START, GET_AUCTIONS_FINISH, GET_AUCTIONS_ERROR } from './state/actions';
import Home from './pages/Home';
import AuctionList from './pages/AuctionList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#47A7AD',
    },
    secondary: {
      main: '#f8f8f8',
    },
  },
});

const getState = (state, dispatch) => ({
  ...state,
  getAuctions: async () => {
    try {
      dispatch({ type: GET_AUCTIONS_START });
      const response = await fetch('http://localhost:4000/get-auction-list/500?minMarginPercentage=1.5');
      const auctions = await response.json();
      dispatch({ type: GET_AUCTIONS_FINISH, auctions });
    } catch (error) {
      dispatch({ type: GET_AUCTIONS_ERROR, error });
    }
  },
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Context.Provider value={getState(state, dispatch)}>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="auction/:id" element={<AuctionList />} />
            </Routes>
          </BrowserRouter>
        </Context.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
