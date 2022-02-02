import {
  SET_CREATE_NEW_LEAGUE_STEP,
  CREATE_LEAGUE_START,
  CREATE_LEAGUE_FINISH,
  CREATE_LEAGUE_ERROR,
  ADD_SELECTED_MATCH,
  REMOVE_SELECTED_MATCH,
  SET_SELECTED_LIST_ITEM,
} from '../actions';

export const initialState = {
  createNewLeagueStep: 1,
  isLoading: false,
  hasError: false,
  wasLeagueCreationSuccesful: false,
  selectedMatches: [],
  selectedListItem: {},
};

const auctionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATE_NEW_LEAGUE_STEP: {
      const { step } = action;
      return { ...state, createNewLeagueStep: step };
    }
    case CREATE_LEAGUE_START: {
      return { ...state, isLoading: true, wasLeagueCreationSuccesful: false, hasError: false };
    }
    case CREATE_LEAGUE_FINISH: {
      return { ...state, isLoading: false, wasLeagueCreationSuccesful: true, hasError: false };
    }
    case CREATE_LEAGUE_ERROR: {
      return { ...state, isLoading: false, wasLeagueCreationSuccesful: false, hasError: true };
    }
    case ADD_SELECTED_MATCH: {
      const { matchId } = action;
      const { selectedMatches } = state;
      selectedMatches.push(matchId);
      return { ...state, selectedMatches };
    }
    case REMOVE_SELECTED_MATCH: {
      const { matchId } = action;
      const { selectedMatches } = state;
      return { ...state, selectedMatches: selectedMatches.filter(id => id !== matchId) };
    }
    case SET_SELECTED_LIST_ITEM: {
      const { selectedListItem } = action;
      return { ...state, selectedListItem };
    }
    default: {
      return state;
    }
  }
};

export default auctionListReducer;
