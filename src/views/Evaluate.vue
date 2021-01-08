<template>
  <div class="evaluate">
    <div>
        <h2></h2>
        <img src="" alt="">
        <p>作品名</p>
        <p>制作者</p>
        <p>{{ getBoothNumber }}</p>
        <div v-for="group in studentDatas" :key="group.id">
            <div v-for="member in group.members" :key="member.id">
                <p v-if =" group.booth_number == getBoothNumber ">{{member.id}}</p>
            </div>
        </div>
    </div>
    <div>
        <h2>評価項目</h2>
        <div class="set-point">
            <div>
                <h3>デザイン</h3>
            </div>
            <div>
                <input type="radio" id="design-5" value="5" v-model="design">
                <label for="design-5"></label>  
                <input type="radio" id="design-4" value="4" v-model="design">
                <label for="design-4"></label>  
                <input type="radio" id="design-3" value="3" v-model="design">
                <label for="design-3"></label> 
                <input type="radio" id="design-2" value="2" v-model="design">
                <label for="design-2"></label> 
                <input type="radio" id="design-1" value="1" v-model="design">
                <label for="design-1"></label>
            </div>
        </div>
        <div class="set-point">
            <div>
                <h3>実装</h3>
            </div>
            <div>
                <input type="radio" id="coding-5" value="5" v-model="coding">
                <label for="coding-5"></label>
                <input type="radio" id="coding-4" value="4" v-model="coding">
                <label for="coding-4"></label>
                <input type="radio" id="coding-3" value="3" v-model="coding">
                <label for="coding-3"></label>
                <input type="radio" id="coding-2" value="2" v-model="coding">
                <label for="coding-2"></label>
                <input type="radio" id="coding-1" value="1" v-model="coding">
                <label for="coding-1"></label>
            </div>
        </div>
        <div class="set-point">
            <div>
                <h3>プレゼン</h3>
            </div>
            <div>
                <input type="radio" id="presentation-5" value="5" v-model="presentation">
                <label for="presentation-5"></label>
                <input type="radio" id="presentation-4" value="4" v-model="presentation">
                <label for="presentation-4"></label>
                <input type="radio" id="presentation-3" value="3" v-model="presentation">
                <label for="presentation-3"></label>
                <input type="radio" id="presentation-2" value="2" v-model="presentation">
                <label for="presentation-2"></label>
                <input type="radio" id="presentation-1" value="1" v-model="presentation">
                <label for="presentation-1"></label>
            </div>
        </div>
        <div class="set-point">
            <div>
                <h3>企画</h3>
            </div>
            <div>
                <input type="radio" id="plan-5" value="5" v-model="plan">
                <label for="plan-5"></label>
                <input type="radio" id="plan-4" value="4" v-model="plan">
                <label for="plan-4"></label>
                <input type="radio" id="plan-3" value="3" v-model="plan">
                <label for="plan-3"></label>
                <input type="radio" id="plan-2" value="2" v-model="plan">
                <label for="plan-2"></label>
                <input type="radio" id="plan-1" value="1" v-model="plan">
                <label for="plan-1"></label>
            </div>
        </div>
        <div>
            <h3>ご意見がございましたら、<br>よろしくお願いいたします。</h3>
            <textarea name="comment" id="comment" cols="25" rows="4" v-model="comment"></textarea>
        </div>
        <button v-on:click="addEvaluation()">評価する</button>
    </div>
    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">
            <p>ありがとうございました！</p>
            <img src="../assets/thanks.png" alt="">
            <router-link to="/works">一覧へ戻る</router-link>
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
            booth_number: this.$store.getters.getBoothNumber,
            author: this.$store.getters.getAuthorData,
            design:'',
            coding:'',
            presentation:'',
            plan:'',
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
    .evaluate{
        padding-top: 110px
    }
    .set-point div:nth-child(2) > input[type=radio]:checked ~ label{
        background: blue;
    }
    .set-point div:nth-child(1) h3{
        text-align: left;
    }
    .set-point input{
        display: none;
    }
    .set-point {
        margin: 0 auto;
        width: 300px;
        display: grid;
        grid-template-columns: 1fr 2.5fr;
    }
    .set-point label{
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-color: green;
        float: right;
        margin: 0 5px;
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
        width: 200px;
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
</style>