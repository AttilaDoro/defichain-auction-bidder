import {
  GET_AUCTIONS_START,
  GET_AUCTIONS_FINISH,
  GET_AUCTIONS_ERROR,
} from '../actions';

export const initialState = {
  isLoading: false,
  hasError: false,
  wasGettingAuctionListSuccessful: false,
};

const auctionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUCTIONS_START: {
      return { ...state, isLoading: true, wasGettingAuctionListSuccessful: false, hasError: false };
    }
    case GET_AUCTIONS_FINISH: {
      return { ...state, isLoading: false, wasGettingAuctionListSuccessful: true, hasError: false };
    }
    case GET_AUCTIONS_ERROR: {
      return { ...state, isLoading: false, wasGettingAuctionListSuccessful: false, hasError: true };
    }
    default: {
      return state;
    }
  }
};

export default auctionListReducer;
