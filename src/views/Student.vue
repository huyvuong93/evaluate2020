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
                          <div id="chart">
                            <apexchart type="donut" width="380" :options="chartOptions" 
                            :series="[student.evaluation_aggregate.aggregate.sum.design,
                            student.evaluation_aggregate.aggregate.sum.coding,
                            student.evaluation_aggregate.aggregate.sum.presentation,
                            student.evaluation_aggregate.aggregate.sum.plan]"></apexchart>
                          </div>
                          <div class="point-sum">
                            <div class="point-title">
                              <p>デザイン</p>
                              <p :class="changeClass">{{ student.evaluation_aggregate.aggregate.sum.design }} <span>点</span></p>
                            </div>
                            <div class="point-title">
                              <p>コーディング</p>
                              <p :class="changeClass">{{ student.evaluation_aggregate.aggregate.sum.coding }} <span>点</span></p>
                            </div>
                            <div class="point-title">
                              <p>プレゼンテーション</p>
                              <p :class="changeClass">{{ student.evaluation_aggregate.aggregate.sum.presentation }} <span>点</span></p>
                            </div>
                            <div class="point-title">
                              <p>企画</p>
                              <p :class="changeClass">{{ student.evaluation_aggregate.aggregate.sum.plan }} <span>点</span></p>
                            </div>
                          </div>
                          <div class="evaluate-list" v-for="evaluate in student.evaluation" :key="evaluate.id">
                              <div class="point-list">
                                <div>
                                  <p>デザイン</p>
                                  <p :class="changeClass"> {{evaluate.design}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>コーディング</p>
                                  <p :class="changeClass"> {{evaluate.coding}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>プレゼンテーション</p>
                                  <p :class="changeClass"> {{evaluate.presentation}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>企画</p>
                                  <p :class="changeClass"> {{evaluate.plan}}<span>点</span></p>
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
import ApexCharts from 'vue-apexcharts'


export default {
  name:'AllStudents',
  components:{
    apexchart: ApexCharts
  },
  mounted(){
      this.forceRerender();

  },
  data(){
      return{
          componentKey: 0,
          student_id:this.$store.state.student_id,
          series: [],
          chartOptions: {
            chart: {
              type: 'donut',
            },
            dataLabels: {
              enabled: true,
              textAnchor:'left',
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 350
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            labels:["デザイン","コーディング","プレゼン","企画"],
            plotOptions:{
              pie:{donut:{
                labels:{
                  show: true,
                  value:{
                    show:true
                  },
                  total:{
                    show: true,
                    label:'トータル',
                    }
                  }
                }
              }
            }
          }
      }
  },
  computed:{
    changeClass: function(){
      var theClass = "";
      if(this.student_id.slice(0,2) == "19"){
        theClass = "grade_2"
      }else{
        theClass = "grade_1"
      }
      return theClass
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
  .grade_1{
    background-color: #DD8800;
    border: 5px solid #FF9D00;
  }
  .grade_2{
    background-color: #018FD0;
    border: 5px solid #05B1FF;
  }
  #chart {
    text-align: left;
    width: 350px;
    margin: 0 auto;
    
  }
  
</style>