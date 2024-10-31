import { ClickAwayListener, Popper } from '@mui/material'
import { useRef, useState } from 'react'
import { SketchPicker } from 'react-color'

import { Button } from '../button'

type ColorPickerProps = {
  label: string
  color?: string
  onChange: (val: string) => void
  className?: string
}
export function ColorPicker({
  label,
  className,
  onChange,
  color,
}: ColorPickerProps) {
  const colorPopperRef = useRef<HTMLElement | null>(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        ref={colorPopperRef}
        variant="secondary"
      >
        {label}
      </Button>
      {isColorPickerOpen && (
        <ClickAwayListener onClickAway={() => setIsColorPickerOpen(false)}>
          <Popper anchorEl={colorPopperRef.current} open={isColorPickerOpen}>
            <SketchPicker color={color} onChange={(val) => onChange(val.hex)} />
          </Popper>
        </ClickAwayListener>
      )}
    </>
  )
}
