import CheckIcon from '@mui/icons-material/Check'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Tooltip } from '@mui/material'
import { useState } from 'react'

type CopyButtonProps = {
  value: string
}
export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const onClick = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tooltip placement="top" title={copied ? 'Copied!' : 'Copy'}>
      {copied ? (
        <CheckIcon sx={{ width: '1rem', color: 'green' }} />
      ) : (
        <ContentCopyIcon
          onClick={onClick}
          sx={{ cursor: 'pointer', width: '1rem', color: 'ButtonText' }}
        />
      )}
    </Tooltip>
  )
}
