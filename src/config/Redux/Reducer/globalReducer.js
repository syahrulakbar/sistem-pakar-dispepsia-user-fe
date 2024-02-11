const initialState = {
  user: {},
  isLogin: false,
  isLoading: true,
  showModal: false,
};
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_IS_LOGIN':
      return {
        ...state,
        isLogin: action.payload,
      };
    case 'SET_SHOW_MODAL':
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
