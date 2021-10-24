import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import type { MenuState } from './menu'
import type { WidgetState } from './widget'

import { createStore, useStore as baseUseStore } from 'vuex'
import { widget } from './widget'
import { menu } from './menu'

export interface RootState {
  menu: MenuState
  widget: WidgetState
}

export const key: InjectionKey<Store<RootState>> = Symbol('vue-store')

export const store = createStore<RootState>({
  modules: {
    menu,
    widget
  }
})

export function useStore() {
  return baseUseStore(key)
}
