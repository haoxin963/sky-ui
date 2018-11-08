import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import errLog from './modules/errLog'
import permission from './modules/permission'
import getters from './getters'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    app,
    user,
    errLog,
    tagsView
  },
  getters
})

export default store
