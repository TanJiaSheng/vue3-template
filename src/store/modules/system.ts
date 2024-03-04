import { Module } from 'vuex'
import RootStateTypes, { SystemStateTypes } from '../types'
const System: Module<SystemStateTypes, RootStateTypes> = {
    namespaced: true, // 为每个模块添加一个前缀名，保证模块命明不冲突
    state: {
        sidebar: '123',
        info: {}
    },
    mutations: {
        TOGGLE_SIDEBAR: (state) => {
            state.sidebar = '2222'
        }
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        }
    }
}

export default System
