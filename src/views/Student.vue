<template>
  <div class="student" :key="componentKey">
        <ApolloQuery 
            :query=" gql => gql`
            query allStudents($student_id:String) {
                students(where: {student_id: {_eq: $student_id}}) {
                  id
                  student_id
                  booth_number
                  evaluation(order_by: {created_at: desc}) {
                    author
                    plan
                    coding
                    design
                    presentation
                    created_at
                    comment
                  }
                  evaluation_aggregate {
                    aggregate {
                      sum {
                        coding
                        design
                        plan
                        presentation
                      }
                    }
                  }
                }
              }
            `"
            :variables="{
                student_id
            }"
            >          
            <template v-slot="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo"> ローディング ...</div>

                <div v-else-if="error"> 404 </div>               
                <div v-if="data" >
                    <div> 
                        <div v-for="student in data.students" :key="student.id"> 
                          <h5>{{student.student_id}}</h5>
                          <div class="point-sum">
                            <div class="point-title">
                              <p>デザイン</p>
                              <p>{{ student.evaluation_aggregate.aggregate.sum.design }} <span>点</span></p>
                            </div>
                            <div class="point-title">
                              <p>コーディング</p>
                              <p>{{ student.evaluation_aggregate.aggregate.sum.coding }} <span>点</span></p>
                            </div>
                            <div class="point-title">
                              <p>プレゼンテーション</p>
                              <p>{{ student.evaluation_aggregate.aggregate.sum.presentation }} <span>点</span></p>
                            </div>
                            <div class="point-title">
                              <p>企画</p>
                              <p>{{ student.evaluation_aggregate.aggregate.sum.plan }} <span>点</span></p>
                            </div>
                          </div>
                          <div class="evaluate-list" v-for="evaluate in student.evaluation" :key="evaluate.id">
                              <div class="point-list">
                                <div>
                                  <p>デザイン</p>
                                  <p> {{evaluate.design}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>コーディング</p>
                                  <p> {{evaluate.coding}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>プレゼンテーション</p>
                                  <p> {{evaluate.presentation}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>企画</p>
                                  <p> {{evaluate.plan}}<span>点</span></p>
                                </div>
                              </div>
                              <div>
                                <p> {{evaluate.comment}} </p>
                              </div>
                              <div class="author">
                                <p> {{evaluate.author}} </p>
                              </div>
                                <p> {{evaluate.created_at}} </p>
                          </div>        
                        </div>
                      </div>
                  </div>
                  <div v-else> <h2>頑張ってください！</h2></div>
            </template>   
        </ApolloQuery>
    </div>
</template>

<script>
import gql from 'graphql-tag';


export const allStudents = gql `
    query allStudents{
        students {
            id
            student_id
            booth_number
        }
    }`;


export default {
  name:'AllStudents',
  mounted(){
      this.forceRerender();
  },
  data(){
      return{
          componentKey: 0,
          student_id:this.$store.state.student_id
      }
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;  
    }
  }
 
}
</script>
<style scoped>
  .student{
    padding-top: 110px
  }
  .point-sum{
    margin: 10px auto;
    width: 300px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:10px 20px;
  }
  .point-title p:nth-child(1){
    font-size: 13px;
    font-weight: 900;
    text-align: left;
    color: black;
    height: 20px;
  }
  .point-title p:nth-child(2){
    font-size: 20px;
    color: white;
    background-color: #018FD0;
    border: 5px solid #05B1FF;
    border-radius: 30px;
    padding: 8px;
    margin: 5px 0;
  }.point-title p:nth-child(2) span{
    font-size: 12px;
  }
  .evaluate-list{
    width: 300px;
    margin: 20px auto;
    border-radius: 8px ;
    box-shadow: 2px 3px 2px #e3e3e3;
    padding: 5px;
  }
  .point-list{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .point-list div p:nth-child(1){
    font-size:8px;
    height: 10px;
    font-weight: bolder;
  }
  .point-list div p:nth-child(2){
    width: 45px;
    font-size: 40px;
    background-color:#018FD0;
    border: 5px solid #05B1FF;
    border-radius: 50%;
    margin:10px auto;
    color: white;
  }
  .point-list div p:nth-child(2) span{
    font-size: 13px
  }
  .author p{
    text-align: end;
    margin-right: 10px ;
  }
</style>