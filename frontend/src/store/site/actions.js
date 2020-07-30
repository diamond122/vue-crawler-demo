import axios from "axios";

const getSites = async ({ commit }) => {
  console.log('action->sites Start');
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:3000/sites')
      .then(response => {
        console.log('action->sites', response);
        commit('SET_SITES', response.data.sites);
        resolve(response);
      })
      .catch(err => {
        console.log("err:", err);
        reject(err);
      });
  });
};

const crawlSite = async ({ commit }, url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/${encodeURIComponent(url)}`)
      .then(response => {
        console.log("response:", response);
        commit('ADD_SITE', response.data);
        resolve(response);
      })
      .catch(err => {
        console.log("err:", err);
        reject(err);
      });
  });
};

export default {
  getSites,
  crawlSite,
};
