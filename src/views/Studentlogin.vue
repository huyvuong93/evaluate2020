<template>
    <div class="studentlogin">
        <img src="~@/assets/LOGO.png">
        <p>日本電子専門学校Webデザイン科</p>
        <h1>卒業・進級制作展</h1>
        <h2>Webデザイン科学生入り口</h2>
        <p class='input-title'>学籍番号</p>
        <input type="text" placeholder="19/20aw01OO" v-model="student_id">
        <button v-on:click="login(student_id)">ログイン</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            student_id:''
        }
    },
    methods:{
        login(student_id){
            this.$store.commit('studentLogin',{student_id:student_id});
            this.$router.push({ path:'/student' })
        }
    }
}
</script>
<style scoped>
    .studentlogin{
        padding-top: 100px;
    }
    img{
        width: 250px;
    }
    input{
        width: 300px;
        padding: 20px 0;
        border-radius: 8px;
        border: solid 3px #03BAD1;
        text-align: center;
        font-size:20px ;
    }
    button{
        display: block;
        width: 300px;
        padding: 20px 0;
        margin: 20px auto;
        background-color: #03BAD1;
        color: white;
        border-radius: 8px;
        border: none;
        box-shadow: 0 5px #2D929F;
    }
    .input-title{
        width: 300px;
        text-align: left;
        margin: 20px auto;
    }
</style>