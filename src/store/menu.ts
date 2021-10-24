import type { Module } from 'vuex'
import type { RootState } from './index'

export interface MenuState {
  top: number
  left: number
  show: boolean
}

export const menu: Module<MenuState, RootState> = {
  namespaced: true,

  state: {
    top: 0,
    left: 0,
    show: false
  },

  getters: {
    top: (state) => state.top,
    left: (state) => state.left,
    show: (state) => state.show
  },

  mutations: {
    SET_COORD(state, { top, left }) {
      state.top = top
      state.left = left
    },
    SET_SHOW(state, show) {
      state.show = show
    }
  },

  actions: {
    show({ commit }, { top, left }) {
      commit('SET_COORD', { top, left })
      commit('SET_SHOW', true)
    },
    hidden({ commit }) {
      commit('SET_SHOW', false)
    }
  }
}
