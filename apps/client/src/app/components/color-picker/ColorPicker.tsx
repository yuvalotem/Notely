import { ClickAwayListener, Popper } from '@mui/material'
import { useRef, useState } from 'react'
import { SketchPicker } from 'react-color'

import { Button } from '../button'

type ColorPickerProps = {
  label: string
  color?: string
  onChange: (val: string) => void
  className?: string
  id?: string
}
export function ColorPicker({
  label,
  className,
  onChange,
  color,
  id,
}: ColorPickerProps) {
  const colorPopperRef = useRef<HTMLButtonElement | null>(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        id={id}
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        ref={colorPopperRef}
        variant="secondary"
      >
        {label}
      </Button>
      {isColorPickerOpen && (
        <ClickAwayListener onClickAway={() => setIsColorPickerOpen(false)}>
          <Popper
            anchorEl={colorPopperRef.current}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
            ]}
            open={isColorPickerOpen}
            style={{ zIndex: 9999 }}
          >
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                overflow: 'hidden',
              }}
            >
              <SketchPicker
                color={color}
                onChange={(val) => onChange(val.hex)}
                styles={{
                  default: {
                    picker: {
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(4px)',
                      WebkitBackdropFilter: 'blur(4px)',
                      boxShadow: 'none',
                      borderRadius: '16px',
                    },
                  },
                }}
              />
            </div>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  )
}
