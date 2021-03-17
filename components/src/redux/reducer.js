const initialState = {
  inProfile: false,
  profileData:{},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INPROFILE": {
      return {
        inProfile: action.payload.inProfile,
        profileData:state.profileData
      };
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
