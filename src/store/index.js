import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    author:'',
    booth_number:'',
    student_id:''
  },
  mutations: {
    readAuthor(state){
      state.author = JSON.parse(localStorage.author)
    },
    setWork(state,student){
      state.booth_number = Number(student.booth_number)
    },
    studentLogin(state,payload){
      state.student_id = payload.student_id
    },
    readCustomer(state,payload){
      state.author = payload
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    getAuthorData: state => {
      return state.author
    },
    getBoothNumber: state => {
      return state.booth_number
    },
    getStudentId: state => {
      return state.student_id
    }
  }
})
