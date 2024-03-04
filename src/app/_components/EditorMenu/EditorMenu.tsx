import { Link } from '@mui/icons-material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

type Props = {
  onLinkEmbedAdd: () => void
  // onImageAdd: () => void
}

export const EditorMenu = ({ onLinkEmbedAdd }: Props) => {
  return (
    <SpeedDial
      ariaLabel='Editor Menu'
      icon={<SpeedDialIcon />}
      openIcon={<SpeedDialIcon />}
      direction='right'
      sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
      }}
    >
      <SpeedDialAction
        icon={<Link />}
        tooltipTitle='リンク埋め込み'
        onClick={onLinkEmbedAdd}
      />
      {/* <SpeedDialAction
        icon={<Image />}
        tooltipTitle='画像'
        onClick={onImageAdd}
      /> */}
    </SpeedDial>
  )
}
