<template>
  <div id="FollowingDefault">
    <loading :action="loading"></loading>

    <div class="columns">

      <div class="column is-4">
        <nav class="panel">
          <p class="panel-heading">{{ JSON.parse(list).length }} Following</p>
        </nav>

        <nav class="panel">
          <p class="panel-heading">Settings</p>

          <label class="panel-block">
            <a v-on:click.prevent="getData">Chanrger plus de données</a>
          </label>

          <label class="panel-block">
            <input type="checkbox">Remember me</label>
            <div class="panel-block">
              <button class="button is-primary is-outlined is-fullwidth">Reset all filters</button>
            </div>
          </nav>
        </div>

      <div class="column is-8">
        <table class="table is-narrow is-striped is-bordered">
          <thead>
            <tr>
              <th>@SCREEN_NAME</th>
              <th>VERIFIED</th>
              <th>SELECTED</th>
            </tr>
          </thead>
          <tbody v-for="user in JSON.parse(list)">
            <tr>
              <td>{{ user.screen_name }}</td>
              <td>{{ user.verified }}</td>
              <th><input type="checkbox" :value="user.selected"></th>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Loading from '@/components/Loading';

export default {
  name: 'followingDefault',
  components: {
    Loading
  },
  data () {
    return {
      loading: false
    }
  },
  computed: mapGetters({
    list: ['following/LIST']
  }),
  methods: {

    getData () {
      this.loading = true;
      this.$store.dispatch('following/getData').then((resolve) => {
        this.loading = false;
      }, reject => {
        this.loading = false;
      });
    }
  }
}
</script>
