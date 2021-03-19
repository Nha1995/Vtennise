const initialState = {
  inProfile: false,
  profileData: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INPROFILE": {
      if (action.payload.inProfile) {
        return {
          inProfile: action.payload.inProfile,
          profileData: state.profileData,
        };
      } else {
        return {
          inProfile: action.payload.inProfile,
          profileData: {},
        };
      }
    }
    case "PROFILEDATA": {
      return {
        inProfile: state.inProfile,
        profileData: action.payload.profileData,
      };
    }
    default: {
      return state;
    }
  }
}
export default reducer;
