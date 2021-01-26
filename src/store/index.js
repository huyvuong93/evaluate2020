import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    author:'',
    booth_number:'',
    student_id:''
  },
  plugins: [createPersistedState()],
  mutations: {
    readAuthor(state){
      state.author = JSON.parse(localStorage.author)
    },
    setWork(state,payload){
      state.booth_number = payload.booth_number
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
