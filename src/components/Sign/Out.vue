<template>
  <div></div>
</template>

<script>
export default {
  name: 'signOut',
  created () {
    this.$store.dispatch('codebird/CB_LOGOUT').then((resolve) => {
      this.$router.push({ name: 'signIn' });
    });
  }
}
</script>
