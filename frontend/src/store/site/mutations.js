const ADD_SITE = (state, newSite) => {
  state.sites = [...state.sites, newSite ];
};
const SET_SITES = (state, sites) => {
  state.sites = sites;
};

export default {
  ADD_SITE,
  SET_SITES,
};
