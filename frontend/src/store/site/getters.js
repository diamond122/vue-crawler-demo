const sites = state => state.sites;

const site = state => (_id) => state.sites.find(site => site._id === _id) ?? {};

export default {
  sites,
  site,
};
