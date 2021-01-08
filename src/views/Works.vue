<template>
  <div class="works">
    <input type="text" v-model="search" placeholder="ブース番号をいれてください">
    <div class="grade-button-group">
        <button v-on:click="showGrade = '1' ">1年生</button>
        <button v-on:click="showGrade = '2' ">2年生</button>
    </div>
    <div class="works-list">
        <div v-for="student in filteredItem" :key="student.id">
            <div v-on:click="chooseWork(student.booth_number,student.id)">
                <p>{{ student.booth_number }}</p>
                <p>{{ student.id }}</p>
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
            search:'',
            studentDatas:[],
            showGrade:'1'
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
        }
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
    .works{
        padding-top: 110px
    }
    input{
        width: 333px;
        padding: 20px 0;
        border: solid 5px #03BAD1;
        border-radius: 8px;
        text-align: center;
    }
    .grade-button-group{
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
    }
    .grade-button-group button{
        width: 150px;
        padding: 20px 0;
        border: none;
        border-radius: 5px;
        background-color: transparent;
        box-shadow: 0 5px #E3E3E3;
    }
    .grade-button-group button:nth-child(1):focus{
        background-color: #FF9D00;
        color: white;
        box-shadow: none;
    }
    .grade-button-group button:nth-child(2):focus{
        background-color: #00B1FF;
        color: white;
        box-shadow: none;
    }
    .works-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 5px
    }
</style>