<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'
export default {
  components: {
    Footer
  }
}
</script>
