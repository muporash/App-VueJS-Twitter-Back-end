import local from '@/vuex/localStorageDB';
const state = {
  LIST: localStorage.getItem('FOLLOWING/LIST') || localStorage.setItem('FOLLOWING/LIST', JSON.stringify([])),
  NEXT_CURSOR: localStorage.getItem('FOLLOWING/NEXT_CURSOR') || localStorage.setItem('FOLLOWING/NEXT_CURSOR', 0),
}

const getters = {
  LIST: state => state.LIST,
  NEXT_CURSOR: state => state.NEXT_CURSOR
}

const actions = {
  getData ({ state, commit, dispatch, rootState }) {
    // 1.
    let params = {
      count: 200
    }
    if (parseInt(state.NEXT_CURSOR) !== 0) {
      params.cursor = state.NEXT_CURSOR;
    }
    // 2.
    return new Promise((resolve, reject) => {
      rootState.codebird.cb.__call(
        "friends/list",
        params,
        function (reply, rate, err) {
          console.log(reply);
          console.log(rate);
          console.log(err);
          /**
          */
          if (typeof reply.errors !== 'undefined') {
            // 3
            // ERREUR.
            console.log(reply.errors[0]);
            reject();
          } else {
            // 3
            // RECUP DES DONNEES.
            let nextCursor = reply.next_cursor;
            commit('SET_NEXT_CURSOR', nextCursor);
            let users = reply.users;

            for (var i = 0; i < users.length; i++) {

            let uu = users[i];
            // Details par utilisateur.
            let user = {
              id: uu.id,
              verified: uu.verified,
              screen_name: uu.screen_name,
              favourites_count: uu.favourites_count,
              friends_count: uu.friends_count,
              followers_count: uu.followers_count,
              protected: uu.protected,
              selected: false
            }

            let trouverId = function(vv) {
              return user.id == vv.id;
            }
            local.db.SET('FOLLOWING/LIST', user, trouverId);
            }

            // 4.
            if (parseInt(state.NEXT_CURSOR) !== 0) {
              dispatch('getData');
            } else {
              resolve();
            }
          }
          /**
          */
        }
      );
    });
  }
}

const mutations = {
  SET_NEXT_CURSOR (state, nextCursor) {
    localStorage.setItem('FOLLOWING/NEXT_CURSOR', nextCursor);
    state.NEXT_CURSOR = localStorage.getItem('FOLLOWING/NEXT_CURSOR');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
