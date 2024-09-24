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
      <>
        <Button
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
          ref={colorPopperRef}
          variant="secondary"
          className={className}
        >
          {label}
        </Button>
        {isColorPickerOpen && (
          <ClickAwayListener onClickAway={() => setIsColorPickerOpen(false)}>
            <Popper open={isColorPickerOpen} anchorEl={colorPopperRef.current}>
              <SketchPicker
                color={color}
                onChange={(val) => onChange(val.hex)}
              />
            </Popper>
          </ClickAwayListener>
        )}
      </>
    </>
  )
}
