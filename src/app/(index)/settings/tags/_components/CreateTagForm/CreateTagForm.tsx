'use client'

import { useState } from 'react'
import { Box, InputLabel, TextField, Tooltip, Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { Replay } from '@mui/icons-material'
import { Tag } from '@/app/(index)/_components/Tag'
import { useCreateTagForm } from '../hooks/useCreateTagForm'
import { ColorPallet } from '../ColorPallet'
import type { Tag as TagType } from '@prisma/client'
import { hexToRgb } from '@/lib/color'

type Props = {
  onClose: () => void
  allTags: TagType[]
}

export const CreateTagForm = ({ onClose, allTags }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    isLoading,
    current,
    regenerateColor,
  } = useCreateTagForm({ onCanceled: onClose })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const tagPreview = {
    name: 'Tag preview',
    color: current.color,
    brief: current.brief,
  }

  const fieldProps: SxProps<Theme> = {
    '& .MuiInputBase-input': {
      py: 0,
      pl: 1,
    },
  }

  const bgColorRGB = hexToRgb(current.color)
  const bgcolor = `rgba(${bgColorRGB.r}, ${bgColorRGB.g}, ${bgColorRGB.b}, 0.18)`

  return (
    <Box sx={{ bgcolor: 'grey.200', py: '0.25rem', borderRadius: '4px' }}>
      <Box sx={{ p: '0.25rem 1rem' }}>
        <Tag {...tagPreview} />
      </Box>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '1rem',
          p: '0 1rem 1rem 1rem',
        }}
      >
        <div>
          <InputLabel htmlFor='name'>タグの名前</InputLabel>
          <TextField
            id='name'
            variant='filled'
            size='small'
            fullWidth
            {...register('name', {
              required: true,
              validate: (v) => {
                return allTags.some((tag) => tag.name === v)
                  ? '同じ名前のタグが既に存在します'
                  : true
              },
            })}
            placeholder='タグの名前'
            error={!!errors.name}
            helperText={errors.name ? '名前は必須です' : ''}
            sx={fieldProps}
          />
        </div>
        <div>
          <InputLabel htmlFor='brief'>説明</InputLabel>
          <TextField
            id='brief'
            variant='filled'
            size='small'
            {...register('brief')}
            sx={fieldProps}
            placeholder='タグの説明 (任意)'
            fullWidth
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <InputLabel htmlFor='regenerate-color' sx={{ ml: 0.5 }}>
            色
          </InputLabel>
          <div style={{ display: 'flex' }}>
            <Tooltip title='色を再生成' placement='bottom'>
              <button
                onClick={regenerateColor}
                id='regenerate-color'
                style={{
                  backgroundColor: bgcolor,
                  border: `${current.color} 1px solid`,
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                  marginRight: '0.5rem',
                  color: current.color,
                }}
                type='button'
              >
                <Replay />
              </button>
            </Tooltip>
            <TextField
              id='color'
              variant='filled'
              size='small'
              {...register('color', {
                pattern: {
                  value: /^#[0-9a-fA-F]{6}$/,
                  message: '#000000 〜 #ffffff の形式で指定してください',
                },
                minLength: 7,
                maxLength: 7,
              })}
              sx={{
                ...fieldProps,
                m: 'auto',
                flexGrow: 1,
              }}
              onClick={handleClick}
            />
          </div>
        </div>
        <Box sx={{ flexGrow: 1, mt: 'auto', mb: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
            }}
          >
            <Button
              variant='outlined'
              color='error'
              onClick={onClose}
              size='small'
              sx={{ mr: 1 }}
            >
              キャンセル
            </Button>
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              disabled={isLoading}
              size='small'
            >
              作成
            </Button>
          </Box>
        </Box>
        <ColorPallet
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onSelect={(color) => {
            setValue('color', color)
          }}
        />
      </Box>
    </Box>
  )
}
