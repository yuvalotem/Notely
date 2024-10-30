import { AppElement } from './app.element'

// Define the custom element with the appId parameter
export function defineAppElement(appId: string) {
  customElements.define(
    'notely-root',
    class extends AppElement {

      constructor() {
        super(appId)
      }
    }
  )
}
