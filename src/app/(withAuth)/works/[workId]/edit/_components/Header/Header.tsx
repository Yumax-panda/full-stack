import { useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'

import {
  AddPhotoAlternateOutlined,
  CloseOutlined,
  EnhancedEncryptionOutlined,
  PublicOutlined,
  SaveAsOutlined,
} from '@mui/icons-material'
import { Box, IconButton, List, Tooltip } from '@mui/material'

type ButtonWithIconProps = {
  icon: any
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const ButtonWithIcon = ({ icon, text, onClick, type }: ButtonWithIconProps) => (
  <Tooltip title={text} sx={{ mx: '0.5rem' }}>
    <IconButton onClick={onClick} type={type}>
      {icon}
    </IconButton>
  </Tooltip>
)

type ToggleIsPrivateButtonProps = {
  isPrivate: boolean
  toggleIsPrivate: () => void
}

const ToggleIsPrivateButton = ({
  isPrivate,
  toggleIsPrivate,
}: ToggleIsPrivateButtonProps) => (
  <ButtonWithIcon
    icon={isPrivate ? <PublicOutlined /> : <EnhancedEncryptionOutlined />}
    text={isPrivate ? '公開' : '非公開'}
    onClick={toggleIsPrivate}
  />
)

type AddThumbnailButtonProps = {
  onThumbnailAdd: (e: ChangeEvent<HTMLInputElement>) => void
}

const AddThumbnailButton = ({ onThumbnailAdd }: AddThumbnailButtonProps) => (
  <label htmlFor='thumbnail'>
    <ButtonWithIcon
      icon={<AddPhotoAlternateOutlined />}
      text='サムネイル'
      type='button'
    />
    <input
      id='thumbnail'
      type='file'
      accept='image/*'
      style={{ display: 'none' }}
      onChange={onThumbnailAdd}
    />
  </label>
)

type Props = ToggleIsPrivateButtonProps & AddThumbnailButtonProps
export const Header = ({
  isPrivate,
  toggleIsPrivate,
  onThumbnailAdd,
}: Props) => {
  const router = useRouter()

  return (
    <nav
      style={{
        backgroundColor: 'inherit',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1rem',
        }}
      >
        <List sx={{ display: 'flex' }}>
          <ButtonWithIcon
            icon={<CloseOutlined />}
            text='戻る'
            onClick={router.back}
          />
        </List>
        <List sx={{ display: 'flex' }}>
          <AddThumbnailButton onThumbnailAdd={onThumbnailAdd} />
          <ToggleIsPrivateButton
            isPrivate={isPrivate}
            toggleIsPrivate={toggleIsPrivate}
          />
          <ButtonWithIcon icon={<SaveAsOutlined />} text='保存' type='submit' />
        </List>
      </Box>
    </nav>
  )
}
