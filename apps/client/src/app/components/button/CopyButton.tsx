import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Tooltip } from '@mui/material'

type CopyButtonProps = {
  value: string
}
export const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const onClick = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top">
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
