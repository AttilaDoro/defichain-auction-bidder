import {
  GET_AUCTIONS_START,
  GET_AUCTIONS_FINISH,
  GET_AUCTIONS_ERROR,
  SET_CURRENT_BLOCK,
} from './actions';

export const initialState = {
  isGetAuctionsLoading: false,
  hasAuctionListError: false,
  auctions: [],
  currentBlock: 0,
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
    case SET_CURRENT_BLOCK: {
      const { currentBlock } = action;
      return { ...state, currentBlock };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
