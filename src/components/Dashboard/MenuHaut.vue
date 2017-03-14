<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item"><p class="tag is-dark is-medium">@{{ JSON.parse(user).screen_name }}</p></a>
        <router-link class="nav-item is-tab is-hidden-mobile" :to="{ name: 'followingDefault' }">Following</router-link>
        <router-link class="nav-item is-tab is-hidden-mobile" :to="{ name: 'defaultRoute' }">Followers</router-link>
        <router-link class="nav-item is-tab is-hidden-mobile" :to="{ name: 'tweetsDefault' }">Tweets</router-link>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <router-link class="nav-item is-tab is-hidden-mobile linkButton" :to="{ name: 'defaultRoute' }">
          <p class="tag is-info is-medium">Logs</p>
        </router-link>
        <router-link class="nav-item is-tab is-hidden-mobile linkButton" :to="{ name: 'signOut' }">
          <p class="tag is-danger is-medium">Sign out <button class="delete"></button></p>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'menuHaut',
  computed: mapGetters({
    user: 'codebird/user'
  })
}
</script>

<style>
.linkButton:hover {
  border-bottom: 1px solid white !important;
}
</style>
