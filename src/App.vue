<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'app',
  created () {
    this.verifier();
  },
  methods: {
    verifier () {
      this.$store.dispatch('codebird/CB_VERIFY').then((resolve) => {
        if (this.$route.name == 'signIn' || this.$route.name == 'defaultRoute') {
          this.$router.push({ name: 'dashboardDefault' });
        }
      }, reject => {
        console.log(reject);
        this.$router.push({ name: 'signIn' });
      });
    }
  }
}
</script>

<style>

</style>
