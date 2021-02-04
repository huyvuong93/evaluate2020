<template>
  <div class="recruiter">
    <h2>職業を選択してください</h2>
      <div class="nav">
        <button v-on:click="selectOccupation('採用担当者')"><img src="../assets/recruiter.png"><br>営業・採用担当者</button>
        <button v-on:click="selectOccupation('ディレクター')"><img src="../assets/director.png"><br>ディレクター</button>
        <button v-on:click="selectOccupation('エンジニア')"><img src="../assets/engineer.png"><br>エンジニア</button>
        <button v-on:click="selectOccupation('デザイナー')"><img src="../assets/designer.png"><br>デザイナー</button>
      </div>
  </div>
</template>
<script>
export default {
  
  data() {
    return{

    }
  },
  methods:{
    selectOccupation(job){
      localStorage.setItem('author',JSON.stringify(job));
      console.log(job);
      this.$store.commit('readAuthor');
      this.readLocalStorage();
    },
    changeURL(){
      this.$router.push({ path:'/works'});
    },
    readLocalStorage(){
      if(localStorage.author){
        this.$store.commit('readAuthor');
        this.changeURL();
      }
    }
  },
  mounted() {
        this.readLocalStorage();
    }, 
}
</script>
<style scoped>
@media screen and (min-width:700px) {
  .recruiter{
    max-width: 500px;
    margin: auto;
  }
}
  .recruiter{
    padding-top:100px;
  }
  .nav{
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 80%;
    margin: 0 auto;
    grid-gap: 10px
  }
  .nav button{
    width: 100%;
    padding:10px;
    background-color: white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 5px #E3E3E3;
  }
  .nav button img{
    width: 100px;
  }
</style>