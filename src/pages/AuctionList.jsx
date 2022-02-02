import React, { useReducer } from 'react';
import AuctionListContext from '../state/auctionList/auctionListContext';
import auctionListReducer, { initialState } from '../state/auctionList/auctionListReducer';
import { GET_AUCTIONS_START, GET_AUCTIONS_FINISH, GET_AUCTIONS_ERROR } from '../state/actions';

const getState = (state, dispatch) => ({
  ...state,
  getAuctions: async () => {
    try {
      dispatch({ type: GET_AUCTIONS_START });
      // await axios.post('/api/league', league);
      // await client.loan.listAuctions({ limit: numOfAuctions });
      dispatch({ type: GET_AUCTIONS_FINISH });
    } catch (error) {
      dispatch({ type: GET_AUCTIONS_ERROR });
    }
  },
});

const AuctionList = () => {
  const [state, dispatch] = useReducer(auctionListReducer, initialState);
  const { isLoading } = state;
  return (
    <AuctionListContext.Provider value={getState(state, dispatch)}>
      {isLoading && 'LOADING'}
      <div>AUCTIONS</div>
    </AuctionListContext.Provider>
  );
};

export default AuctionList;
