import Vue from 'vue'
import Router from 'vue-router'

// components

// Connexion -- Déconnexion
import SignIn from '@/components/Sign/In';
import SignOut from '@/components/Sign/Out';

// Dashboard
import Dashboard_Default from '@/components/Dashboard/Default';

// Dashbord -> Following
import Following_Default from '@/components/Following/Default';

// Dashboard -> Tweets
import Tweets_Default from '@/components/Tweets/Default';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'defaultRoute'
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn,
      meta: 'Sign In'
    },
    {
      path: '/signout',
      name: 'signOut',
      component: SignOut
    },
    {
      path: '/dashboard',
      name: 'dashboardDefault',
      component: Dashboard_Default,
      meta: 'Dashboard',
      children: [
        {
          path: 'following',
          name: 'followingDefault',
          component: Following_Default,
          meta: 'Following'
        },
        {
          path: 'tweets',
          name: 'tweetsDefault',
          component: Tweets_Default,
          meta: 'Tweets'
        }
      ]
    }
  ]
})
