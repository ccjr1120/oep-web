const initialState = {
  avatarUrl: "",
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 1:
      return { avatarUrl: action.avatarUrl };
    default:
      return state;
  }
}

export default reducer;
