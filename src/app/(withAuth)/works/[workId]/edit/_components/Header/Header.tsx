import { ChangeEvent, useRef } from 'react'

import {
  AddPhotoAlternateOutlined,
  CloseOutlined,
  EnhancedEncryptionOutlined,
  PublicOutlined,
  SaveAsOutlined,
} from '@mui/icons-material'
import { Box, IconButton, List, Tooltip } from '@mui/material'

import { Link } from '@/app/_components/Link'
import { routes } from '@/lib/routes'

type ButtonWithIconProps = {
  icon: any
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const ButtonWithIcon = ({
  icon,
  text,
  onClick,
  type,
  disabled,
}: ButtonWithIconProps) => (
  <Tooltip title={text} sx={{ mx: '0.5rem' }}>
    <IconButton onClick={onClick} type={type} disabled={disabled}>
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
    icon={!isPrivate ? <PublicOutlined /> : <EnhancedEncryptionOutlined />}
    text={!isPrivate ? '「公開」に設定中' : '「非公開」に設定中'}
    onClick={toggleIsPrivate}
  />
)

type AddThumbnailButtonProps = {
  onThumbnailAdd: (e: ChangeEvent<HTMLInputElement>) => void
}

// onClickとonChangeが重複してonChangeが発火しないのでrefを使ってinputをクリックする
const AddThumbnailButton = ({ onThumbnailAdd }: AddThumbnailButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <label htmlFor='thumbnail'>
      <ButtonWithIcon
        icon={<AddPhotoAlternateOutlined />}
        text='サムネイル'
        type='button'
        onClick={() => inputRef.current?.click()}
      />
      <input
        id='thumbnail'
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={onThumbnailAdd}
        ref={inputRef}
        onClick={(e) => {
          e.currentTarget.value = ''
        }}
      />
    </label>
  )
}

type Props = ToggleIsPrivateButtonProps &
  AddThumbnailButtonProps & { isLoading: boolean; workId: string }

export const Header = ({
  workId,
  isPrivate,
  isLoading,
  toggleIsPrivate,
  onThumbnailAdd,
}: Props) => {
  return (
    <nav
      style={{
        backgroundColor: 'white',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #e0e0e0',
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
          <Link href={routes.workDetail(workId)}>
            <ButtonWithIcon
              icon={<CloseOutlined />}
              text='プレビュー画面へ戻る'
            />
          </Link>
        </List>
        <List sx={{ display: 'flex' }}>
          <AddThumbnailButton onThumbnailAdd={onThumbnailAdd} />
          <ToggleIsPrivateButton
            isPrivate={isPrivate}
            toggleIsPrivate={toggleIsPrivate}
          />
          <ButtonWithIcon
            icon={<SaveAsOutlined />}
            text='保存'
            type='submit'
            disabled={isLoading}
          />
        </List>
      </Box>
    </nav>
  )
}
