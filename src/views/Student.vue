<template>
  <div class="student" :key="componentKey">
        <ApolloQuery 
            :query=" gql => gql`
            query allStudents($student_id:String) {
                students(where: {student_id: {_eq: $student_id}}) {
                  id
                  student_name
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
                          <h5 :class="changeClass">{{student.student_name}}</h5>
                          <p class="presentation-count">トータル<span>{{ student.evaluation.length }}</span>回プレゼンしました。</p>
                          <div id="chart">
                            <apexchart type="donut" width="380" :options="chartOptions" 
                            :series="[student.evaluation_aggregate.aggregate.sum.design,
                            student.evaluation_aggregate.aggregate.sum.coding,
                            student.evaluation_aggregate.aggregate.sum.presentation,
                            student.evaluation_aggregate.aggregate.sum.plan]"></apexchart>
                          </div>
                          <div class="evaluate-list" v-for="evaluate in student.evaluation" :key="evaluate.id">
                            
                              <div class="point-list">
                                <div>
                                  <p>デザイン</p>
                                  <p class="evaluate-bg-design"> {{evaluate.design}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>コーディング</p>
                                  <p class="evaluate-bg-coding"> {{evaluate.coding}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>プレゼンテーション</p>
                                  <p class="evaluate-bg-presentation"> {{evaluate.presentation}}<span>点</span></p>
                                </div>
                                <div>
                                  <p>企画</p>
                                  <p class="evaluate-bg-plan"> {{evaluate.plan}}<span>点</span></p>
                                </div>
                              </div>
                              <div>
                                <p> {{evaluate.comment}} </p>
                              </div>
                              <div class="author">
                                <p> {{evaluate.author}} </p>
                                <p> {{evaluate.created_at}} </p>
                              </div>
                                
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
            colors: ['#F56582', '#445771', '#FFCC56', '#01B5B2'],
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
    padding-top: 90px;
    margin:auto
  }
  .presentation-count span{
    font-size: 40px;
    color:#018FD0 ;
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
    max-width: 80%;
    margin: 20px auto;
    border-radius: 8px ;
    background-color: white;
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
    width: 48px;
    height: 48px;
    font-size: 38px;

    border-radius: 50%;
    margin:10px auto;
    color: white;
  }
  .point-list div p:nth-child(2) span{
    font-size: 10px
  }
  .author{
    width: 85%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .grade_1{
    background-color: #DD8800;
    padding: 20px 0;
    margin-top:0;
    color: white;
    font-size: 20px;
  }
  .grade_2{
    background-color: #018FD0;
    padding: 20px 0;
    margin-top:0;
    color: white;
    font-size: 20px;
  }
  #chart {
    text-align: left;
    width: 350px;
    margin: 0 auto;
    
  }
  .evaluate-bg-design{
    background-color: #F56582;
    border: solid 3px #E7E8EA;
  }.evaluate-bg-coding{
    background-color: #445771;
    border: solid 3px #E7E8EA;
  }.evaluate-bg-presentation{
    background-color: #FFCC56;
    border: solid 3px #E7E8EA;
  }.evaluate-bg-plan{
    background-color: #01B5B2;
    border: solid 3px #E7E8EA;
  }
</style>