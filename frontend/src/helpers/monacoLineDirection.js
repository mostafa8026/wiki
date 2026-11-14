import * as monaco from 'monaco-editor'

// -> The letters of the scripts written right to left: Hebrew, Arabic (Persian with it), Syriac,
//    Thaana, N'Ko, and the presentation forms of Hebrew and Arabic
const RTL_LETTER = /[֐-ࣿיִ-﷿ﹰ-﻿]/

/**
 * Lay each line of a Monaco source editor out in the direction of its own text (Chapyar fork).
 *
 * Monaco draws every line left to right, so a Persian sentence came out with its words in reverse
 * order and its punctuation at the wrong end. A line whose first letter is from a right-to-left
 * script is marked right to left instead, as `dir="auto"` would decide it -- the markup in front of
 * that letter (`## `, `- [`, `> **`) carries no direction of its own. A line with no letter at all,
 * blank or `---`, keeps the direction of the line above, so the caret on an empty line in Persian
 * text waits on the right; the first line takes `baseDir`.
 *
 * The listener and the decorations belong to the editor and go when it is disposed.
 *
 * @param {object} editor The Monaco editor.
 * @param {'ltr'|'rtl'} baseDir The direction of the page's language.
 */
export function followLineDirection(editor, baseDir) {
  const decorations = editor.createDecorationsCollection()

  function update() {
    const model = editor.getModel()
    if (!model) {
      return
    }
    let rtl = baseDir === 'rtl'
    const lines = []
    model.getLinesContent().forEach((text, idx) => {
      const letter = text.match(/\p{L}/u)?.[0]
      if (letter) {
        rtl = RTL_LETTER.test(letter)
      }
      if (rtl) {
        lines.push(idx + 1)
      }
    })
    // -> Nothing to redraw on most keystrokes: the marks already sit one per line on these lines
    const marked = decorations
      .getRanges()
      .map((range) => (range.startLineNumber === range.endLineNumber ? range.startLineNumber : 0))
    if (marked.join() === lines.join()) {
      return
    }
    // -> To the end of the line, so the rows a long line wraps onto are laid out with it
    decorations.set(
      lines.map((line) => ({
        range: new monaco.Range(line, 1, line, model.getLineMaxColumn(line)),
        options: { textDirection: monaco.editor.TextDirection.RTL }
      }))
    )
  }

  update()
  editor.onDidChangeModelContent(update)
}
