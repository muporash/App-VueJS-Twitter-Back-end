<template>
  <div>

    <button v-on:click.prevent="testApi">VERIFIY_CREDENTIALS</button>
    <button v-on:click.prevent="lien">Connexion</button>

    <div v-if="pinCodeDiv">
      <input type="text" v-model="pinCode">
      <input type="submit" v-on:click.prevent="validerPinCode" />
    </div>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'hello',
  data () {
    return {
      pinCode: null,
      pinCodeDiv: false,
      connecte: false
    }
  },
  methods: {
    verifier() {
      this.$store.dispatch('codebird/CB_VERIFY').then((resolve) => {
        console.log("ok token");
      }, reject => {
        console.log("pas ok token")
      });
    },
    lien() {
      this.$store.dispatch('codebird/CB_REQUEST_TOKEN').then((resolve) => {
        this.pinCodeDiv = true;
        console.log("ouverture du lien");
      }, reject => {
        console.log("erreur lien");
      });
    },
    validerPinCode() {
      this.$store.dispatch('codebird/CB_OAUTH_ACCES_TOKEN', this.pinCode).then((resolve) => {
        console.log("vous êtes connecté");
        this.connecte = true;
      }, reject => {
        console.log("Erreur de connexion");
      });
    },
    testApi() {
      this.$store.dispatch('twitter/VERIFIY_CREDENTIALS').then((resolve) => {
        console.log(resolve);
      });
    }
  }
}
</script>
