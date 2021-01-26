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
@font-face {
  font-family: 'nicola';
  src: url('fonts/nicoca_v1.ttf');
}
#app {
  font-family:'nicola','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  box-sizing: border-box;
}
body{
  margin: 0;
  background: url('assets/dot-grid.png');
  background-size:contain;
  background-position-x: center;
  background-position-y: center;
}
.top-bar{
  position: fixed;
  top: 0;
  z-index: 11;
}
</style>
