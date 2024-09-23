import { useRef, useState } from 'react'
import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { BuilderPageContextProvider } from './BuilderPageContext'
import { BuidlerPreview } from './BuidlerPreview'
import { StyleBar } from './StyleBar'
import { Button } from '../../components'

export const BuilderPage = () => {
  const [sourceCode, setSourceCode] = useState<string>()

  const onCreate = () => {
    if (!sourceCode) {
      return
    }
    fetch(`http://localhost:8000/api`, {
      method: 'POST',
      body: JSON.stringify({ component: sourceCode }),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8000',
        'Referrer-Policy': 'no-referrer',
      },
    })
  }

  return (
    <BuilderPageContextProvider>
      <div className="w-full h-full">
        <PageHeader
          title={'Create your element'}
          actions={
            <Button disabled={!sourceCode} onClick={onCreate}>
              Save
            </Button>
          }
        />
        <PageBody className="flex flex-row">
          <StyleBar />
          <BuidlerPreview setSourceCode={setSourceCode} />
        </PageBody>
      </div>
    </BuilderPageContextProvider>
  )
}
