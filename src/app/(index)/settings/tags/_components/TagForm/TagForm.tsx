'use client'

import { FormEventHandler, useState } from 'react'
import { Box, InputLabel, TextField, Tooltip, Button } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { Replay } from '@mui/icons-material'
import { Tag } from '@/app/(index)/_components/Tag'
import { ColorPallet } from '../ColorPallet'
import { hexToRgb } from '@/lib/color'
import type {
  UseFormRegister,
  FormState,
  UseFormSetValue,
} from 'react-hook-form'

type FormValues = {
  name: string
  brief: string
  color: string
}

type Props = {
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  register: UseFormRegister<FormValues>
  isLoading: boolean
  current: FormValues
  regenerateColor: () => void
  formState: FormState<FormValues>
  setValue: UseFormSetValue<FormValues>
  onDelete: null | (() => void)
}

// NOTE: zodResolverでバリデーションをするため、ここでは不要
export const TagForm = ({
  onSubmit,
  onDelete,
  register,
  formState: { errors },
  setValue,
  isLoading,
  current,
  regenerateColor,
  onClose,
}: Props) => {
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
    <div>
      <Box
        sx={{
          p: '0.25rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Tag {...tagPreview} />
        {onDelete !== null && (
          <Button
            variant='outlined'
            color='error'
            onClick={onDelete}
            size='small'
            type='button'
          >
            削除
          </Button>
        )}
      </Box>
      <Box
        component='form'
        onSubmit={onSubmit}
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
            {...register('name')}
            placeholder='タグの名前'
            error={!!errors.name}
            helperText={errors.name?.message}
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
            error={!!errors.brief}
            helperText={errors.brief?.message}
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
              {...register('color')}
              sx={{
                ...fieldProps,
                m: 'auto',
                flexGrow: 1,
              }}
              onClick={handleClick}
              error={!!errors.color}
              helperText={errors.color?.message}
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
    </div>
  )
}
