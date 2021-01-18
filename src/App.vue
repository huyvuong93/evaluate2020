<template>
  <div id="app">
    <Topbar class="top-bar" v-if="$route.name !== 'Home' && $route.name !=='StudentLogin'"/>
    <router-view>
      
    </router-view>
  </div>
</template>
<script>
import Topbar from '@/components/Topbar.vue'
export default {
  components:{
    Topbar
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  margin: 0;
}
.top-bar{
  position: fixed;
  top: 0;
  z-index: 11;
}
</style>
