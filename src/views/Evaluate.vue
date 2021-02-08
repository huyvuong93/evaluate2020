<template>
  <div class="evaluate">
    <div>
        <h2>{{ getBoothNumber }}.</h2>
        <img class="worksimg" :src="require('@/assets/work_' + getBoothNumber + '.png')">
        <div class="work-body" v-for=" group in studentDatas " :key="group.id">
            <p v-if =" group.booth_number == getBoothNumber ">{{ group.work_tittle }}</p>
            <div class="members"  v-for=" member in group.members " :key=" member.id ">
                <img class="member-img" v-if =" group.booth_number == getBoothNumber "  
                :src="require('@/assets/member_' + member.id + '.png')">
                <p class="member-name" v-if =" group.booth_number == getBoothNumber "
                style="font-family:'Hiragino Kaku Gothic Pro'">{{ member.name }}</p>
            </div>
        </div>
    </div>
    <div class="evaluate-area">
        <div class="set-point">
            <div>
                <h3 class="point-title">デザイン</h3>
            </div>
            <div class="check pink">
                
                    <input type="radio" checked class="toggle_option" id="design-1" value="1" v-model="design">           
                    <input type="radio" class="toggle_option" id="design-2" value="2" v-model="design">                 
                    <input type="radio" class="toggle_option" id="design-3" value="3" v-model="design">               
                    <input type="radio" class="toggle_option" id="design-4" value="4" v-model="design">                
                    <input type="radio" class="toggle_option" id="design-5" value="5" v-model="design">            
                    <label for="design-1" style="background:#FFCAD1"></label>
                    <label for="design-2" style="background:#FCB2BD"></label>
                    <label for="design-3" style="background:#FA97A9"></label>
                    <label for="design-4" style="background:#F77E95"></label>  
                    <label for="design-5" style="background:#F56884"></label>
                    <div class="toggle_option_slider">
                        <div class="heart">
                            <img src="../assets/pink.png" style="width:100%">
                            <span>{{design}}</span>
                        </div>
                    </div>
    
            </div>
        </div>
        <div class="set-point">
            <div>
                <h3 class="point-title">実装</h3>
            </div>
            <div class="check blue">
                <input type="radio" checked class="toggle_option" id="coding-1" value="1" v-model="coding">           
                <input type="radio" class="toggle_option" id="coding-2" value="2" v-model="coding">                 
                <input type="radio" class="toggle_option" id="coding-3" value="3" v-model="coding">               
                <input type="radio" class="toggle_option" id="coding-4" value="4" v-model="coding">                
                <input type="radio" class="toggle_option" id="coding-5" value="5" v-model="coding">            
                <label for="coding-1" style="background:#98C1FA"></label>
                <label for="coding-2" style="background:#82A6D7"></label>
                <label for="coding-3" style="background:#6E8CB6"></label>
                <label for="coding-4" style="background:#587192"></label>  
                <label for="coding-5" style="background:#445771"></label>
                <div class="toggle_option_slider">
                    <div class="heart">
                        <img src="../assets/blue.png" style="width:100%">
                        <span>{{coding}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="set-point">
            <div>
                <h3 class="point-title">プレゼン</h3>
            </div>
            <div class="check yellow">
                <input type="radio" checked class="toggle_option" id="presentation-1" value="1" v-model="presentation">           
                <input type="radio" class="toggle_option" id="presentation-2" value="2" v-model="presentation">                 
                <input type="radio" class="toggle_option" id="presentation-3" value="3" v-model="presentation">               
                <input type="radio" class="toggle_option" id="presentation-4" value="4" v-model="presentation">                
                <input type="radio" class="toggle_option" id="presentation-5" value="5" v-model="presentation">            
                <label for="presentation-1" style="background:#FFEFCA"></label>
                <label for="presentation-2" style="background:#FDE5AD"></label>
                <label for="presentation-3" style="background:#FCDB90"></label>
                <label for="presentation-4" style="background:#FAD071"></label>  
                <label for="presentation-5" style="background:#FFCC56"></label>
                <div class="toggle_option_slider">
                    <div class="heart">
                        <img src="../assets/yellow.png" style="width:100%">
                        <span>{{presentation}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="set-point">
            <div>
                <h3 class="point-title">企画</h3>
            </div>
            <div class="check green">
                <input type="radio" checked class="toggle_option" id="plan-1" value="1" v-model="plan">           
                <input type="radio" class="toggle_option" id="plan-2" value="2" v-model="plan">                 
                <input type="radio" class="toggle_option" id="plan-3" value="3" v-model="plan">               
                <input type="radio" class="toggle_option" id="plan-4" value="4" v-model="plan">                
                <input type="radio" class="toggle_option" id="plan-5" value="5" v-model="plan">            
                <label for="plan-1" style="background:#B3C6C6"></label>
                <label for="plan-2" style="background:#88C0C0"></label>
                <label for="plan-3" style="background:#5CBBB9"></label>
                <label for="plan-4" style="background:#2EB5B2"></label>  
                <label for="plan-5" style="background:#02B6B3"></label>
                <div class="toggle_option_slider">
                    <div class="heart">
                        <img src="../assets/green.png" style="width:100%">
                        <span>{{plan}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p class="hiragino-font">その他何かありましたらコメントお願いいたします。</p>
            <textarea name="comment" id="comment" cols="25" rows="4" v-model="comment"></textarea>
        </div>
        <button v-on:click="addEvaluation()">送信</button>
    </div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">
            <p>ご評価ありがとうございました！</p>
            <img src="../assets/thanks.png" alt="">
            <router-link class="back-to-works" to="/works">一覧へ戻る</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import studentDatas from '../assets/students_data.json'
import gql from 'graphql-tag'

const ADD_EVALUATION = gql `
  mutation ($booth_number: numeric,
            $plan: numeric,
            $coding: numeric,
            $design: numeric,
            $presentation: numeric,
            $comment:String,
            $author:String,
            ) {
            insert_evaluate(objects: {booth_number: $booth_number,
                                        plan: $plan,
                                        coding: $coding,
                                        design: $design,
                                        presentation: $presentation,
                                        comment: $comment,
                                        author: $author}) {
                affected_rows
                returning {
                        id
                        booth_number
                        plan
                        coding
                        design
                        presentation
                        comment
                        author
                        created_at
                    }
                }
            }
            `;

export default {
    data(){
        return{
            isOpen:false,
            booth_number: Number(this.$store.getters.getBoothNumber),
            author: this.$store.getters.getAuthorData,
            design:'1',
            coding:'1',
            presentation:'1',
            plan:'1',
            comment:'',
            studentDatas: []
        }
    },
    created(){
        this.studentDatas = studentDatas
    },
    computed:{
        getBoothNumber(){
            return this.$store.getters.getBoothNumber
        },
        getAuthorData(){
            return this.$store.getters.getAuthorData
        }
    },
    methods:{
            async addEvaluation() {
                const booth_number = this.booth_number;
                const plan = this.plan;
                const coding = this.coding;
                const design = this.design;
                const presentation = this.presentation;
                const comment = this.comment;
                const author = this.author;
                await this.$apollo.mutate({
                    mutation: ADD_EVALUATION,
                    variables: {    
                        booth_number,
                        plan,
                        coding,
                        design,
                        presentation,
                        comment,
                        author,
                    },
                    update: (cache, { data: { insert_evaluate}}) => {
                        // Read data from cache for this query

                        try {
                            const insertedEvaluation = insert_evaluate.returning;
                            console.log(insertedEvaluation)
                        }
                        catch (err) {
                            console.error(err)
                        }

                    }
                }).then(() => {
                    this.isOpen = true;
                }).catch(err => console.log(err));

                this.plan = '';
                this.coding = '';
                this.design = '';
                this.presentation = '';
                this.comment = '';
            },
        }
}
</script>
<style scoped>
    h2{
        text-align: left;
        margin-top: 0;
    }
    .evaluate-area{
        display: inline-block;
        margin: 0 auto;
        width: 700px;
    }
    #comment{
        width: 100%;
        border: solid 5px  #03BAD1;
        border-radius:8px;
        font-size: 20px;
        padding: 5px;
    }
    textarea:focus{
        outline: none;
    }
    button{
        width: 100%;
        background-color: #03BAD1;
        border: none;
        border-radius: 8px;
        box-shadow: 0 5px #2D929F;
        font-size: 17px;
        margin: 20px auto;
        padding: 20px 118px;
        color: white;
    }
    .worksimg{
        width: 100%;
        box-shadow: 3px 3px 5px #CACACA;
    }
    .work-body{
        width: 100%;
        text-align: left;
        margin: auto;
        font-size: 20px;
    }
    .member-img{
        width: 70px;
        margin-right:10px ;
    }
    .members{
        float: left;
    }
    .members p{
        width: 70px;
        margin: 0;
        font-size: 13px;
        text-align: center;
    }
    .hiragino-font{
        text-align:left;
        width:100%;
        margin:10px 0;
        font-family:'Hiragino Kaku Gothic Pro',sans-serif
    }

    .evaluate{
        max-width: 700px;
        padding-top: 100px;
        padding-bottom: 50px;
        margin: auto;
    }
    .set-point div:nth-child(1) h3{
        text-align: left;
    }
    .set-point input{
        display: none;
    }
    .set-point {
        margin: 0 auto;
        min-width: 300px;
        display: grid;
        grid-template-columns: 30% 70%;
    }
    .set-point label{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
    }
    .set-point div:nth-child(2){
        padding: 20px 0;
    }
    .set-point label:after{
        display: block;
    }
    .modal {
        width: 80vw;
        margin: 0px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        transition: all 0.2s ease-in;
    }
    .modal p{
        margin:10px 0;
        font-weight:bold ;
    }
    .modal img{
        width: 250px;
    }
    .modal a{
        display: block;
        margin: 30px 0;
        padding: 20px 0;
        background-color: #03BAD1;
        border-radius:8px;
        box-shadow: 0 5px #2D929F;
        text-decoration: none;
        color: white;
    }
    .back-to-works{
        font-family: 'Hiragino';
    }
    .fadeIn-enter {
        opacity: 0;
    }

    .fadeIn-leave-active {
        opacity: 0;
        transition: all 0.2s step-end;
    }

    .fadeIn-enter .modal,
    .fadeIn-leave-active.modal {
        transform: scale(1.1);
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #00000094;
        z-index: 999;
        transition: opacity 0.2s ease;
    }
    #comment{
        border: solid 5px  #03BAD1;
        border-radius:8px;
        font-size: 20px;
        padding: 5px;
    }
    button{
        background-color: #03BAD1;
        border: none;
        border-radius: 8px;
        box-shadow: 0 5px #2D929F;
        margin: 20px auto;
        padding: 20px 118px;
        color: white;
    }
    .check{
        position: relative;
        display: flex;
        justify-content: space-between;
    }
    .check::before{
        width: calc(100% * (4.5 / 5));
        content: " ";
        position: absolute;
        height: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: -1;
    }
    .pink::before{
        background: rgb(255,203,209);
        background: linear-gradient(90deg, rgba(255,203,209,1) 0%, rgba(245,101,130,1) 100%);
    }
    .blue::before{
        background: rgb(147,187,242);
        background: linear-gradient(90deg, rgba(147,187,242,1) 0%, rgba(68,87,113,1) 100%);
    }
    .yellow::before{
        background: rgb(254,232,183);
        background: linear-gradient(90deg, rgba(254,232,183,1) 0%, rgba(249,199,84,1) 100%);
    }
    .green::before{
        background: rgb(164,196,196);
        background: linear-gradient(90deg, rgba(164,196,196,1) 0%, rgba(2,175,172,1) 100%);
    }
    .toggle_option_slider{
        width: 50px;
        height: 50px;
        position: absolute;
        top: 20%;
        left: -2%;
        -webkit-transition: all .4s ease;
        -moz-transition: all .4s ease;
        -o-transition: all .4s ease;
        -ms-transition: all .4s ease;
        transition: all .4s ease;
        z-index: 3;
    }
    .heart{
        position: relative;
    }
    .toggle_option_slider span{
        position: absolute;
        display: block;
        top:3px;
        width: 50px;
        height: 50px;
        font-size: 30px;
        color: white;
    }
    .point-title{
        font-family: 'Hiragino Kaku Gothic Pro',sans-serif;
        font-size: 12px;
        padding:10px 0
    }
    #coding-1:checked ~ .toggle_option_slider,
    #design-1:checked ~ .toggle_option_slider,
    #presentation-1:checked ~ .toggle_option_slider,
    #plan-1:checked ~ .toggle_option_slider{
        left: -2%;
    }
    #coding-2:checked ~ .toggle_option_slider,
    #design-2:checked ~ .toggle_option_slider,
    #presentation-2:checked ~ .toggle_option_slider,
    #plan-2:checked ~ .toggle_option_slider{
        left: 22%;
    }
    #coding-3:checked ~ .toggle_option_slider,
    #design-3:checked ~ .toggle_option_slider,
    #presentation-3:checked ~ .toggle_option_slider,
    #plan-3:checked ~ .toggle_option_slider{
        left: 45%;
    }
    #coding-4:checked ~ .toggle_option_slider,
    #design-4:checked ~ .toggle_option_slider,
    #presentation-4:checked ~ .toggle_option_slider,
    #plan-4:checked ~ .toggle_option_slider{
        left: 68%;
    }
    #coding-5:checked ~ .toggle_option_slider,
    #design-5:checked ~ .toggle_option_slider,
    #presentation-5:checked ~ .toggle_option_slider,
    #plan-5:checked ~ .toggle_option_slider{
        left: 92%;
    }
    @media screen and (max-width:767px) {
        .evaluate{
            max-width: 300px;
            margin: auto;
        }
        .set-point {
            margin: 0 auto;
            max-width: 300px;
            display: grid;
            grid-template-columns: 1fr 3fr;
        }
        .toggle_option_slider{
            width: 30px;
            height: 30px;
            left: 3px;
            top:27%
        }
        .set-point label{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
        }
        .toggle_option_slider span{
            width: 30px;
            height: 30px;
            font-size: 16px;
        }
        #coding-1:checked ~ .toggle_option_slider,
        #design-1:checked ~ .toggle_option_slider,
        #presentation-1:checked ~ .toggle_option_slider,
        #plan-1:checked ~ .toggle_option_slider{
            left: -4px;
        }
        #coding-2:checked ~ .toggle_option_slider,
        #design-2:checked ~ .toggle_option_slider,
        #presentation-2:checked ~ .toggle_option_slider,
        #plan-2:checked ~ .toggle_option_slider{
            left: 47px;
        }
        #coding-3:checked ~ .toggle_option_slider,
        #design-3:checked ~ .toggle_option_slider,
        #presentation-3:checked ~ .toggle_option_slider,
        #plan-3:checked ~ .toggle_option_slider{
            left: 97px;
        }
        #coding-4:checked ~ .toggle_option_slider,
        #design-4:checked ~ .toggle_option_slider,
        #presentation-4:checked ~ .toggle_option_slider,
        #plan-4:checked ~ .toggle_option_slider{
            left: 150px;
        }
        #coding-5:checked ~ .toggle_option_slider,
        #design-5:checked ~ .toggle_option_slider,
        #presentation-5:checked ~ .toggle_option_slider,
        #plan-5:checked ~ .toggle_option_slider{
            left: 200px;
        }
        .evaluate-area{
            width: 300px;
        }
        .worksimg{
            width: 300px;
        }
        #comment{
            width: 300px;
        }
        button{
            width: 300px;
        }
    }
</style>