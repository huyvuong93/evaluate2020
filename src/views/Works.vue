<template>
  <div class="works">
    <div class="search_box">
        <img class="search_icon" src="../assets/search_icon.svg" alt="">
        <input type="text" v-model="search" placeholder="ブース番号をいれてください"> 
    </div>
    <div class="grade-button-group">
        <div class="btn-bg">
            <button v-on:click="showGrade = '1' " :class="{active : showGrade === '1'}">1年生</button>
        </div>
        <div class="btn-bg">
            <button v-on:click="showGrade = '2' " :class="{active2 : showGrade === '2'}">2年生</button>
        </div>
    </div>
    <div class="works-list">
        <div v-for="student in filteredItem" :key="student.id">
            <div v-on:click="chooseWork(student.booth_number,student.id)">
                <p>{{ student.booth_number }}.</p>
                <img class="worksimg" :src="require('@/assets/work_' + student.booth_number + '.png')">
                <div class="work-title">
                    <p>{{ student.work_tittle }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import studentDatas from '../assets/students_data.json'
export default {
    data(){
        return{
            isActive: false,
            search:'',
            studentDatas:[],
            showGrade:''
        }
    },
    created(){
        this.studentDatas = studentDatas
    },
    computed:{
        filteredItem(){
            return this.studentDatas.filter((student) =>{
                if(this.search){
                    return student.booth_number.includes(this.search)
                }
                else if(this.showGrade == "1"){
                    return student.grade.includes(this.showGrade = "1")
                }
                else{
                    return student.grade.includes(this.showGrade = "2")
                }
            })
        },
    },
    methods:{
        chooseWork(booth_number){
            this.$store.commit('setWork',{booth_number:booth_number});
            this.$router.push({path:'/evaluate'})
        },
        readLocalStorage(){
            this.$store.commit('readAuthor')
        },
    },
    mounted(){
        this.readLocalStorage();
    }
}
</script>
<style scoped>
@media screen and (min-width:768px) {
    p{
        font-size: 1.4rem;
    }
}
    .works{
        padding-top: 100px
    }
    input{
        width:85%;
        padding: 17px 0;
        border: none;
        text-align: center;
        font-size: 17px;
    }
    input:focus{
        outline: none;
    }
    .search_box{
        width: 90%;
        margin: auto;
        display:flex;
        justify-content: center;
        border: solid 5px #00B1FF;
        border-radius: 8px;
        background: white;
    }
    .search_icon{
        padding: 17px 0;
    }
    .grade-button-group{
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin: 10px auto;
    }
    .btn-bg{
        background-color: white;
    }
    .grade-button-group button{
        width: 150px;
        padding: 20px 0;
        border: none;
        border-radius: 5px;
        box-shadow: 0 5px #E3E3E3;
        outline: none;
    }
    .grade-button-group .active:focus{
        background-color: #FF9D00;
        color: white;
        box-shadow: none;
        outline: none
    }
    .grade-button-group .active2:focus{
        background-color: #00B1FF;
        color: white;
        box-shadow: none;
        outline: none
    }
    .active{
        background-color:#FF9D00 ;
        color: white;
    }
    .active2{
        background-color: #00B1FF;
        color: white;
    }
    .works-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px;
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }
    .work-title{
        height: 40px;
        font-family: 'Hiragino',sans-serif;
        font-size: 13px;
    }
    .work-title p{
        margin-top:5px
    }
    .worksimg{
        width: 100%;
        box-shadow: 3px 3px 5px #CACACA;
    }
</style>