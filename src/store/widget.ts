import type { Module } from 'vuex'
import type { RootState } from './index'
import type { LooseOptions, WidgetConfig } from '@/models/widget'
import { isDef } from '@/utils'
import { widgetHook } from '@/hooks/widget'

export interface WidgetState {
  root: WidgetConfig
  current: WidgetConfig
  action: boolean
}

const rootWidget = widgetHook.getWidgetConfig('root')

export const widget: Module<WidgetState, RootState> = {
  namespaced: true,

  state: {
    root: rootWidget,
    current: rootWidget,
    action: false
  },

  getters: {
    root: (state) => state.root,
    current: (state) => state.current,
    isSettled: (state) => Boolean(state.current.settled),
    isAction: (state) => state.action
  },

  mutations: {
    TOGGLE_LOCK(state) {
      state.current.lock = !state.current.lock
    },
    PUSH_WIDGET(state, { current, parent }: { current: WidgetConfig; parent: WidgetConfig }) {
      parent.children?.push(current)
    },
    DELETE_WIDGET(state) {
      const index = state.current.parent?.children?.findIndex((item) => item === state.current)
      if (isDef(index) && index !== -1) {
        const parentWidget = state.current.parent?.parent || state.root
        state.current.parent?.children?.splice(index as number, 1)
        state.current = parentWidget
      }
    },
    SET_CURRENT(state, current: WidgetConfig) {
      state.current = current
    },
    SET_STYLE(state, { widget, styles }: { widget?: WidgetConfig; styles: LooseOptions }) {
      const curWidget = widget || state.current
      for (const key in styles) {
        styles[key] && (curWidget.style[key] = styles[key])
      }
    },
    SET_ACTION(state, action: boolean) {
      state.action = action
    }
  },

  actions: {
    lock({ commit }) {
      commit('TOGGLE_LOCK')
    },
    push({ commit }, { current, parent }) {
      commit('PUSH_WIDGET', { current, parent })
    },
    delete({ commit }) {
      commit('DELETE_WIDGET')
    },
    setCurrent({ state, commit }, current) {
      if (state.current === current) return
      if (state.current.virtual) {
        commit('DELETE_WIDGET')
      }
      commit('SET_CURRENT', current)
    },
    setStyle({ state, commit }, styles) {
      const relativeY = styles.top - state.current.style.top
      const relativeX = styles.left - state.current.style.left
      const relativeR = styles.rotate - state.current.style.rotate
      commit('SET_STYLE', { styles })
      if (state.current.virtual) {
        state.current.children?.forEach((item) => {
          const top = item.style.top + relativeY
          const left = item.style.left + relativeX
          const rotate = item.style.rotate + relativeR
          commit('SET_STYLE', { widget: item, styles: { top, left, rotate } })
        })
      }
    },
    setAction({ commit }, action) {
      commit('SET_ACTION', action)
    }
  }
}
