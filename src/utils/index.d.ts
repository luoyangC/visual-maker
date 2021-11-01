import type { WidgetConfig } from '@/models/widget'

type funcType = (...args: any) => any

export * from './type'

export declare function clone(target: any): any

export declare function generateID(): number

export declare function debounce(func: funcType, wait?: number, options?: any): funcType

export declare function throttle(func: funcType, wait?: number, options?: any): funcType

export declare function widgetToJson(widget: WidgetConfig): any
