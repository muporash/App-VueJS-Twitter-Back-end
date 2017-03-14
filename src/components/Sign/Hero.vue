<template>
  <section class="hero is-primary is-medium">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        {{ $route.meta }}
      </h1>
      <h2 class="subtitle">
        Primary subtitle
      </h2>
    </div>
  </div>
</section>
</template>


<script>
export default {
  name: 'hero'
}
</script>
