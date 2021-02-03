<template>
  <div class="top-bar">
    <div class="back-to-works" v-if="$route.name === 'Evaluate'" v-on:click="$router.go(-1)"><img class="back-arrow" src="../assets/arrow.svg"></div>
    <div>
      <img class="logo" src="~@/assets/logo.png">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo{
    width: 90px;
    padding: 6px 0;
    text-align: center;
  }
  .top-bar{
    width: 100vw;
    height: 80px;
    box-shadow:0 5px #E3E3E3;
    background-color: white;
  }
  .back-arrow{
    width:40px ;
  }
  .back-to-works{
    position: absolute;
    top:28px;
    left: 20px;
  }
</style>
