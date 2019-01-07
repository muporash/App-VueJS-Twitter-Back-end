let cb                = new Codebird;
let consumerKey       = '';
let consumerSecret    = '';
cb.setConsumerKey(consumerKey, consumerSecret);

import Vue from 'vue'

const state = {
  cb: cb,
  accesToken: localStorage.getItem('accesToken') || localStorage.setItem('accesToken', null),
  accesTokenSecret: localStorage.getItem('accesTokenSecret') || localStorage.setItem('accesTokenSecret', null),
  user: localStorage.getItem('user') || localStorage.setItem('user', null)
}

const getters = {
  cb: state => state.cb,
  accesToken: state => state.accesToken,
  accesTokenSecret: state => state.accesTokenSecret,
  user: state => state.user
}

const actions = {
  /**
  * LIEN POUR LE PIN CODE.
  */
  CB_REQUEST_TOKEN ({ state, commit, rootState }) {
    return new Promise((resolve, reject) => {
      Vue.http.get('http://127.0.0.1:8090/api/request_callback_link').then(response => {
        window.open(response.body);
        console.log("ok");
      }, response => {
        console.log("pasok");
        reject(response);
      });
    });
  },
  /**
  * VALIDATION DU PIN CODE.
  */
  CB_OAUTH_ACCES_TOKEN ({ state, commit, rootState }, pinCode) {
    return new Promise((resolve, reject) => {
      state.cb.__call(
        "oauth_accessToken",
        {oauth_verifier: pinCode},
        function (reply,rate,err) {
          switch (reply.httpstatus) {
            case 401:
              reject('pas bon');
            break;
            case 200:
              state.cb.setToken(reply.oauth_token, reply.oauth_token_secret);
              commit('SET_ACCES_TOKEN_LOGIN', {
                token: reply.oauth_token,
                tokenSecret: reply.oauth_token_secret
              });
              state.cb.__call(
                "account_verifyCredentials",
                {},
                function (reply,rate,err) {
                  if (typeof reply.errors !== 'undefined') {
                    commit('CB_LOGOUT');
                    reject(reply.errors[0]);
                  } else {
                    let userData = {
                      screen_name: reply.screen_name,
                      name: reply.name,
                      followers: reply.followers_count,
                      favourites: reply.favourites_count,
                      statues: reply.statuses_count,
                      following: reply.friends_count
                    }
                    commit('SET_USER_DATA', userData);
                    resolve();
                  }
                }
              );
            break;
          }
        }
      );
    });
  },
  CB_VERIFY ({ state, commit }) {
    return new Promise((resolve, reject) => {
      if(state.accesToken !== 'null' || state.accesTokenSecret !== 'null') {
        // SET ACCES TOKEN.
        commit('SET_ACCES_TOKEN_VERIFY');
        // CHECK IF OK.
        state.cb.__call(
          "account_verifyCredentials",
          {},
          function (reply,rate,err) {
            if (typeof reply.errors !== 'undefined') {
              commit('CB_LOGOUT');
              reject(reply.errors[0]);
            } else {
              let userData = {
                screen_name: reply.screen_name,
                name: reply.name,
                followers: reply.followers_count,
                favourites: reply.favourites_count,
                statues: reply.statuses_count,
                following: reply.friends_count
              }
              commit('SET_USER_DATA', userData);
              resolve();
            }
          }
        );
      } else {
        reject();
      }
    });
  },
  CB_LOGOUT ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('CB_LOGOUT');
      resolve();
    });
  }
}


const mutations = {
  SET_USER_DATA (state, data) {
    localStorage.setItem('user', JSON.stringify(data));
    state.user = localStorage.getItem('user');
  },
  SET_ACCES_TOKEN_VERIFY (state) {
    state.cb.setToken(state.accesToken, state.accesTokenSecret);
  },
  SET_ACCES_TOKEN_LOGIN (state, acces) {
    // PASS FOR CODEBIRD.
    state.cb.setToken(acces.token, acces.tokenSecret);
    // ACCES TOKEN
    localStorage.setItem('accesToken', acces.token);
    state.accesToken = localStorage.getItem('accesToken');
    // ACCES TOKEN SECRET
    localStorage.setItem('accesTokenSecret', acces.tokenSecret);
    state.accesTokenSecret = localStorage.getItem('accesTokenSecret');
  },
  CB_LOGOUT (state) {
    // LOGOUT FROM CODEBIRD
    state.cb.logout();
    // ACCES TOKEN NULL.
    localStorage.setItem('accesToken', null);
    state.accesToken = localStorage.getItem('accesToken');
    // ACCES TOKEN SECRET NULL.
    localStorage.setItem('accesTokenSecret', null);
    state.accesTokenSecret = localStorage.getItem('accesTokenSecret');
    // USER DATA NULL.
    // ACCES TOKEN SECRET NULL.
    localStorage.setItem('user', null);
    state.user = localStorage.getItem('user');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
