export * from './widget.type'
export { Widget } from './widget'
import { TextWidget } from './widget-text'
import { RootWidget } from './widget-root'
import { SlotWidget } from './widget-slot'
import { ButtonWidget } from './widget-button'
import { ImageWidget } from './widget-image'
import { LinkWidget } from './widget-link'
import { ListWidget } from './widget-list'
import { ColumnWidget } from './widget-column'
import { TableWidget } from './widget-table'
import { VirtualWidget } from './widget-virtual'

export const widgets = {
  TextWidget,
  RootWidget,
  SlotWidget,
  ButtonWidget,
  ImageWidget,
  LinkWidget,
  ListWidget,
  ColumnWidget,
  TableWidget,
  VirtualWidget
}
