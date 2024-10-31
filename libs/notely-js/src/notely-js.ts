import { NotelyAppElement } from './NotelyApp.element'

/**
 * Will define the custom element and connect to Notely server
 * later when the element is pushed from the notely portal it will nbe added to the DOM under the <notely-root> tag
 *
 * @param appId your application ID taken from the notely dashboard
 */
export function setupNotely(appId: string): void {
  customElements.define(
    'notely-root',
    class extends NotelyAppElement {
      constructor() {
        super(appId)
      }
    }
  )
}
