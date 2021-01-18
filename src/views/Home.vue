<template>
  <div class="home">
    <div class="logo">
      <img src="@/assets/LOGO.png" alt="今年の展示会のロゴ">
      <p>日本電子専門学校Webデザイン科</p>
    </div>
    <h1>卒業・進級制作展</h1>
    <p class="notice">今後の制作に役立てるために<br>
    各作品のご評価お願いいたします。</p>
    <div class="nav nav1">
      <router-link  to="/recruiter">企業・卒業生の方</router-link>
    </div>
    <div class="nav nav2">
      <button v-on:click="selectOccupation('一般の方')">一般の方<br>(保護者・学生)</button>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      selectOccupation(job){
        localStorage.setItem('author',JSON.stringify(job));
        console.log(job);
        this.$store.commit('readAuthor');
        this.$router.push({path:'/works'})
      }
    }
  }
</script>
<style scoped>
  .home{
    padding-top: 100px;
  }
  .nav{
    margin: 50px auto;
    width: 200px;
    background-color: #00BAD1;
    border-radius:8px;
    box-shadow: 0 5px #2D929F;
  }
  .nav1{
    padding:30px;
  }
  .nav2{
    padding:20px 30px;
  }
  .nav2 button{
    background-color: transparent;
    border: none;
    color: white;
    font-size: 16px;
    width: 200px;
  }
  .nav a{
    text-decoration: none;
    color:white
  }
  .logo img{
    width: 250px;
  }
</style>
