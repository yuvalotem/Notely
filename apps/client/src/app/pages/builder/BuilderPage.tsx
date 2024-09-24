import { BuilderPageContent } from './BuilderPageContent'
import { BuilderContextProvider } from './BuilderContext'

export const BuilderPage = () => {
  return (
    <BuilderContextProvider>
      <BuilderPageContent />
    </BuilderContextProvider>
  )
}
