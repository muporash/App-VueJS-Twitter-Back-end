const state = {
  FRIENDS_LIST: localStorage.getItem('FRIENDS_LIST') || localStorage.setItem('FRIENDS_LIST', JSON.stringify('[]')),
}

const getters = {
  FRIENDS_LIST: state => JSON.parse(state.FRIENDS_LIST)
}

const actions = {
  VERIFIY_CREDENTIALS ({ state, commit, rootState }) {
    return new Promise((resolve, reject) => {
      rootState.codebird.cb.__call(
        "account_verifyCredentials",
        {},
        function (reply, rate, err) {
          resolve(reply);
        }
      );
    });
  }
}
const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
