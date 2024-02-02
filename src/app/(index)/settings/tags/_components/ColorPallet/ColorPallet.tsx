import { Paper, Typography } from "@mui/material"

type ColorPalletProps = {
  onSelect: (color: string) => void
}

type ColorCellProps = {
  color: string
  onClick: () => void
}

const ColorCell = ({ color, onClick }: ColorCellProps) => (
  <button
    className='color-cell'
    style={{
      backgroundColor: color,
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    }}
    type="button"
    onClick={onClick}
  />
)

export const ColorPallet = ({ onSelect }: ColorPalletProps) => {
  const colors = [
    "#B60205",
    "#D93F0B",
    "#FBCA04",
    "#0E8A16",
    "#006B75",
    "#1D76DB",
    "#0052CC",
    "#5319E7",
    "#E99695",
    "#F9D0C4",
    "#FEF2C0",
    "#C2E0C6",
    "#BFDADC",
    "#C5DEF5",
    "#BFD4F2",
    "#D4C5F9",
  ]
  const onClick = (color: string) => () => onSelect(color)
  return (

    <Paper sx={{ width: "fit-content", padding: "10px" }}>
      <Typography color="GrayText" sx={{ fontSize: "14px" }}>Choose from default colors:</Typography>
      <div className='color-pallet' style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 24px)',
        gap: '4px',
      }}>
        {colors.map((color) => (
          <ColorCell key={color} color={color} onClick={onClick(color)} />
        ))}
      </div>
    </Paper>
  )
}
