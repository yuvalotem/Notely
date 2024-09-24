import { useRef, useState } from 'react'
import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { BuidlerPreview } from './BuidlerPreview'
import { StyleBar } from './StyleBar'
import { Button } from '../../components'
import { useBuilderContext } from './BuilderContext'

export const BuilderPageContent = () => {
  const { sourceCode } = useBuilderContext()

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
    <div className="w-full h-full">
      <PageHeader
        title={'Create your element'}
        actions={
          <Button disabled={!sourceCode} onClick={onCreate}>
            Save
          </Button>
        }
      />
      <div className="flex flex-row h-full">
        <StyleBar />
        <BuidlerPreview />
      </div>
    </div>
  )
}
