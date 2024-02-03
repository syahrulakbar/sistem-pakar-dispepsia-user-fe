export const getBlogs = () => dispatch => {
  dispatch({
    type: 'SET_BLOGS',
    payload: ['blog1', 'blog2', 'blog3'],
  });

  return {
    type: 'SET_BLOGS',
    payload: ['blog1', 'blog2', 'blog3'],
  };
};
