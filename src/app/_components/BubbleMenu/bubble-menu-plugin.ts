import { type Editor, isTextSelection } from '@tiptap/core'
import { BubbleMenuView as View } from '@tiptap/extension-bubble-menu'
import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu'
import { type EditorState, Plugin, PluginKey } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

const IGNORED_NODES = ['heading', 'image', 'embed'] as const

class BubbleMenuView extends View {
  shouldShow: (props: {
    editor: Editor
    view: EditorView
    state: EditorState
    oldState?: EditorState
    from: number
    to: number
  }) => boolean = ({ view, state, from, to }) => {
    const { doc, selection } = state
    const { empty } = selection

    const isEmptyTextBlock =
      !doc.textBetween(from, to).length && isTextSelection(state.selection)

    const isChildOfMenu = !!this.element.contains(document.activeElement)

    const hasEditorFocus = view.hasFocus() || isChildOfMenu

    const isRangeSelected =
      hasEditorFocus && !empty && !isEmptyTextBlock && this.editor.isEditable

    return (
      !IGNORED_NODES.some((v) => this.editor.isActive(v)) && isRangeSelected
    )
  }
}

export const BubbleMenuPlugin = (options: BubbleMenuPluginProps) => {
  return new Plugin({
    key:
      typeof options.pluginKey === 'string'
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: (view) => new BubbleMenuView({ view, ...options }),
  })
}
