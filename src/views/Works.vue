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
                    <div>{{ student.work_tittle }}</div>
                </div>
                <div style="display:flex;justify-content:left">
                    <div v-for="member in student.members" :key="member.id" >
                        <div style="margin-right:5px;margin-top:5px;font-size:10px;font-family:'Hiragino Kaku Gothic Pro'">{{member.name}}</div>
                    </div>
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
                else if(this.showGrade === "2"){
                    return student.grade.includes(this.showGrade = "2")
                }
                else{
                    return student.grade.includes(this.showGrade = "1")
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
@media screen and (min-width:768px){
    .search_box{
        width: 100%;
        margin: 0 auto;
    }
    .grade-button-group{
        width: 100%;
        margin: 10px auto
    }
    .works,.works-list{
        width: 700px;
        margin: auto;
    }
}
    .works{
        padding-top: 100px;
        padding-bottom: 50px;
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
        margin: 15px auto;
    }
    .btn-bg{
        background-color: white;
        width: 46%;
    }
    .grade-button-group button{
        width: 100%;
        display: block;
        padding: 20px 0;
        border: none;
        border-radius: 5px;
        box-shadow: 0 5px #E3E3E3;
        outline: none;
    }
    /* .grade-button-group .active:active{
        background-color: #FF9D00;
        color: white;
        box-shadow: none;
        outline: none
    }
    .grade-button-group .active2:active{
        background-color: #00B1FF;
        color: white;
        box-shadow: none;
        outline: none
    } */
    .grade-button-group button.active{
        background-color:#FF9D00 ;
        color: white;
        box-shadow: none;
    }
    .grade-button-group button.active2{
        background-color: #00B1FF;
        color: white;
        box-shadow: none; 
    }
    .works-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }
    .work-title{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-family: 'Hiragino Kaku Gothic Pro',sans-serif;
        font-size: 10px;
        font-weight:bold;
        margin-top:5px
    }
    .worksimg{
        width: 100%;
        box-shadow: 3px 3px 5px #e3e3e3;
    }
</style>