
let getWatchlist = localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist"))
  : "";


export const initialState = {
  watchlist: getWatchlist,
};

export const AppReducer = (initialState, action) => {

  switch (action.type) {

    case "ADD_LIST":
      return {
        watchlist: action.newList,
      };
    case "DELETE_LIST":
      return {
        watchlist: action.newList,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};