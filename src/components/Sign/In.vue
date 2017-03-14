<template>
  <div id="SignIn">
    <loading :action="loading"></loading>
    <menu-haut></menu-haut>
    <hero></hero>

    <div class="container section">
      <div class="columns is-multiline">

        <!-- BOUTON CONNEXION -->
        <div class="column is-12" v-if="pinCodeDiv == false">

          <article class="message is-info">
            <div class="message-header">
              <p>Info</p>
              <button class="delete"></button>
            </div>
            <div class="message-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>
            </div>
          </article>

          <a class="button is-large" v-on:click.prevent="demanderPinCode">
            <span class="icon is-medium">
              <i class="fa fa-twitter"></i>
            </span>
            <span>Connexion</span>
          </a>

        </div>
        <!-- /. BOUTON CONNEXION -->

        <!-- SAISI PIN CODE -->
        <div class="column is-12" v-if="pinCodeDiv">

          <article class="message is-danger" v-if="pinCodeError">
            <div class="message-header">
              <p>Error PIN CODE</p>
            </div>
            <div class="message-body">
              <a class="button is-large err-but" v-on:click.prevent="demanderPinCode">
                <span class="icon is-medium">
                  <i class="fa fa-twitter"></i>
                </span>
                <span>Connexion</span>
              </a>
            </div>
          </article>

          <article class="message is-warning">
            <div class="message-header">
              <p>Set PIN CODE</p>
            </div>
            <div class="message-body">
              <p class="control is-6">
                <input class="input" type="text" v-model="pinCode">
              </p>
              <p class="control">
                <button class="button" v-on:click.prevent="validerPinCode">Submit</button>
              </p>
            </div>
          </article>
        </div>
        <!-- /. SAISI PIN CODE -->

      </div>
    </div>

  </div>
</template>

<script>
import MenuHaut from '@/components/Sign/MenuHaut';
import Hero from '@/components/Sign/Hero';
import Loading from '@/components/Loading';

export default {
  name: 'signIn',
  components: {
    Loading,
    MenuHaut,
    Hero
  },
  data () {
    return {
      pinCodeError: false,
      pinCodeDiv: false,
      pinCode: '',
      loading: false
    }
  },
  methods: {
    demanderPinCode() {
      this.$store.dispatch('codebird/CB_REQUEST_TOKEN').then((resolve) => {
        console.log(resolve);
        this.pinCodeDiv = true;
        this.pinCodeError = false;
      }, reject => {
        console.log(reject);
        this.pinCodeError = true;
      });
    },
    validerPinCode() {
      this.loading = true
      this.$store.dispatch('codebird/CB_OAUTH_ACCES_TOKEN', this.pinCode).then((resolve) => {
        this.$router.push({ name: 'dashboardDefault' });
      }, reject => {
        this.pinCodeError = true;
        this.loading = false;
      });
    },
  }
}
</script>

<style>
.err-but {
  text-decoration: none !important;
}
</style>
