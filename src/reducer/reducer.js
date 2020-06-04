const initialState = {
  events: [],
  players: [],
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.players,
      };
    default:
      return {
        ...state,
      };
  }
}
