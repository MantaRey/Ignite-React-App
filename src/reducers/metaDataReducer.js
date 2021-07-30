/*
The Reason Why This Is Separate:

"There's nothing wrong with your implementation of useEffect and useDispatch based off what you've provided.
Whatever is causing your unintentional refreshes must be caused by a component higher up in your application that is being affected by the redux state changes.
When the wrapping component subscribed to the redux state experiences a state change, it will re-render. This could cause a change in which components are mounted/unmounted.
In your case, something is causing the Router to be remounted, which means that all the components in the routes with a useEffect hook will run those mounting effects again."

Used to exist in the gamesReducer.js but changing a State (e.g. popular games list changes due to filter) would affect entire Home Page and cause a Reload
*/

const initState = {
  isLoading: true,
};

const metaDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_GAMES":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADED_GAMES":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default metaDataReducer;
