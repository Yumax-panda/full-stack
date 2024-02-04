import { getLevelHelperText, skills } from '@/constants/skills'
import type { Tag as TagType } from '@prisma/client'
import {
  Autocomplete,
  Button,
  Box,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
} from '@mui/material'

import { Tag } from '@/app/(index)/_components/Tag'
import type { FormEvent } from 'react'
import type { UseFormRegister } from 'react-hook-form'

type FormValues = {
  name: string
  level: number
  tagIds: string[]
}

type Props = {
  tags: TagType[]
  onClose: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<FormValues>
  isLoading: boolean
  onDeleted: (() => Promise<void>) | null
}

export const SkillForm = ({
  tags,
  onClose,
  onSubmit,
  register,
  isLoading,
  onDeleted,
}: Props) => {
  const tagMap = new Map(tags.map((tag) => [tag.id, tag]))
  const { min, max, ...registerProps } = register('level')
  const isUpdate = onDeleted !== null

  return (
    <Stack
      sx={{
        display: 'flex',
        width: '100%',
        padding: '1rem',
      }}
    >
      {isUpdate && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='outlined'
            color='error'
            onClick={onDeleted}
            size='small'
            type='button'
          >
            削除
          </Button>
        </div>
      )}
      <form
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
        }}
        onSubmit={onSubmit}
      >
        <Autocomplete
          options={skills.map((skill) => skill.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register('name')}
              label='スキル名'
              variant='standard'
              required
            />
          )}
          freeSolo
          sx={{ flexGrow: 2, mr: '1rem' }}
        />
        <Box
          sx={{
            width: '20%',
            display: 'flex',
            mx: '1rem',
            flexDirection: 'column',
          }}
        >
          <InputLabel id='level'>熟練度</InputLabel>
          <Slider
            min={0}
            max={3}
            step={1}
            sx={{ my: 'auto' }}
            valueLabelFormat={getLevelHelperText}
            valueLabelDisplay='auto'
            {...registerProps}
          />
        </Box>
        <Box sx={{ width: '40%' }}>
          <InputLabel id='tagIds'>タグ</InputLabel>
          <Select
            name='tagIds'
            labelId='tagIds'
            multiple
            fullWidth
            defaultValue={tags.map((tag) => tag.id)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {(selected as string[]).map((value) => {
                  const tag = tagMap.get(value)
                  if (!tag) return null
                  return <Tag key={tag.id} {...tag} />
                })}
              </Box>
            )}
            input={<Input fullWidth />}
            sx={{ flexGrow: 2 }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Button
            variant='outlined'
            color='error'
            onClick={onClose}
            size='small'
            type='button'
          >
            閉じる
          </Button>
          <Button
            variant='outlined'
            color='primary'
            size='small'
            type='submit'
            disabled={isLoading}
          >
            {isUpdate ? '更新' : '追加'}
          </Button>
        </Box>
      </form>
    </Stack>
  )
}
