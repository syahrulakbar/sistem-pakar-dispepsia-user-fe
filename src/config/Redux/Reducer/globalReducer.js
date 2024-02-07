const initialState = {
  blogs: [],
  blog: {},
  isLogin: false,
  showModal: false,
};
const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.payload,
      };
    case 'SET_BLOG':
      return {
        ...state,
        blog: action.payload,
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
