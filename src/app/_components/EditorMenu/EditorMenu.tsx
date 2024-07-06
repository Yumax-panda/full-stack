import { useRef } from 'react'
import type { ChangeEvent } from 'react'

import { Image, Link } from '@mui/icons-material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

type Props = {
  onLinkEmbedAdd: () => Promise<void>
  onImageAdd: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const EditorMenu = ({ onLinkEmbedAdd, onImageAdd }: Props) => {
  return (
    <SpeedDial
      ariaLabel='Editor Menu'
      icon={<SpeedDialIcon />}
      openIcon={<SpeedDialIcon />}
      direction='right'
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
      }}
    >
      <SpeedDialAction
        icon={<Link />}
        tooltipTitle='リンク埋め込み'
        onClick={onLinkEmbedAdd}
      />
      <SpeedDialAction
        icon={<ImageAddButton onImageAdd={onImageAdd} />}
        tooltipTitle='画像'
      />
    </SpeedDial>
  )
}

const ImageAddButton = ({
  onImageAdd,
}: {
  onImageAdd: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <label htmlFor='image-upload'>
      {/* eslint-disable-next-line */}
      <Image />
      <input
        id='image-upload'
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onImageAdd}
        onClick={(e) => {
          e.currentTarget.value = ''
        }}
      />
    </label>
  )
}
