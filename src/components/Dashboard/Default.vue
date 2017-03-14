<template>
  <div id="dashboardDefault">
    <menu-haut></menu-haut>
    <hero></hero>

    <div class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import MenuHaut from '@/components/Dashboard/MenuHaut';
import Hero from '@/components/Dashboard/Hero';

export default {
  name: 'dashboardDefault',
  components: {
    MenuHaut,
    Hero
  }
}
</script>
