import { ClickAwayListener, Popper } from '@mui/material'
import { useRef, useState } from 'react'
import { SketchPicker } from 'react-color'
import { Button } from '../../components'

type ColorPickerProps = {
  label: string
  color?: string
  onChange: (val: string) => void
  className?: string
}
export const ColorPicker = ({
  label,
  className,
  onChange,
  color,
}: ColorPickerProps) => {
  const colorPopperRef = useRef(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  return (
    <>
      <ClickAwayListener onClickAway={() => setIsColorPickerOpen(false)}>
        <Button
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          ref={colorPopperRef}
          variant="text"
          className={className}
        >
          {label}
        </Button>
      </ClickAwayListener>
      <Popper open={isColorPickerOpen} anchorEl={colorPopperRef.current}>
        <SketchPicker color={color} onChange={(val) => onChange(val.hex)} />
      </Popper>
    </>
  )
}
