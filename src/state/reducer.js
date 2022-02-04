import {
  GET_AUCTIONS_START,
  GET_AUCTIONS_FINISH,
  GET_AUCTIONS_ERROR,
} from './actions';

export const initialState = {
  isGetAuctionsLoading: false,
  hasAuctionListError: false,
  auctions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTIONS_START: {
      return { ...state, isGetAuctionsLoading: true, hasAuctionListError: false };
    }
    case GET_AUCTIONS_FINISH: {
      const { auctions } = action;
      return { ...state, isGetAuctionsLoading: false, hasAuctionListError: false, auctions };
    }
    case GET_AUCTIONS_ERROR: {
      return { ...state, isGetAuctionsLoading: false, hasAuctionListError: true };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
