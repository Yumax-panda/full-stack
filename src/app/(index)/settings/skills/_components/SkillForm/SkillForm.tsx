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
  TextField,
} from '@mui/material'

import type { UseCreateSkillFormReturn } from '../hooks/useCreateSkillForm'
import { Tag } from '@/app/(index)/_components/Tag'

type Props = {
  tags: TagType[]
  onClose: () => void
  onDeleted: (() => void) | null
} & UseCreateSkillFormReturn

export const SkillForm = ({
  tags,
  onClose,
  handleSubmit,
  register,
  formState: { errors },
  isLoading,
  onDeleted,
  value,
  handleChangeTagIds,
}: Props) => {
  const tagMap = new Map(tags.map((tag) => [tag.id, tag]))
  const { min, max, ...registerLevelProps } = register('level', {
    valueAsNumber: true,
  })
  const isUpdate = onDeleted !== null

  return (
    <div>
      <Box
        sx={{
          p: '0.25rem 1rem',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {isUpdate && (
          <Button
            variant='outlined'
            color='error'
            onClick={onDeleted}
            size='small'
            type='button'
          >
            削除
          </Button>
        )}
      </Box>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: '1rem',
          p: '0 1rem 1rem 1rem',
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ flexGrow: 2 }}>
          <InputLabel htmlFor='name'>スキル名</InputLabel>
          <Autocomplete
            options={skills.map((skill) => skill.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('name')}
                variant='standard'
                required
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder='スキル名'
                size='small'
                defaultValue={value.name}
              />
            )}
            freeSolo
            fullWidth
            sx={{ flexGrow: 2 }}
            defaultValue={value.name}
          />
        </Box>
        <div style={{ flexGrow: 2 }}>
          <InputLabel id='level'>熟練度</InputLabel>
          <Slider
            min={0}
            max={3}
            step={1}
            sx={{ my: 'auto' }}
            valueLabelFormat={getLevelHelperText}
            valueLabelDisplay='auto'
            {...registerLevelProps}
            defaultValue={value.level}
          />
        </div>
        <div style={{ flexGrow: 2 }}>
          <InputLabel id='tags'>タグ</InputLabel>
          <Select
            id='tags'
            name='tags'
            labelId='tags'
            multiple
            fullWidth
            error={!!errors.tags}
            input={<Input fullWidth />}
            sx={{ flexGrow: 2 }}
            value={value.tags}
            onChange={(e) => {
              handleChangeTagIds(e.target.value)
            }}
            renderValue={(selected) => {
              const tags = selected
                .map((id) => tagMap.get(id))
                .filter(Boolean) as TagType[]
              return tags.map((tag) => <Tag key={tag.id} {...tag} />)
            }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Box sx={{ flexGrow: 1, mt: 'auto', mb: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
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
              {isLoading ? '送信中...' : isUpdate ? '更新' : '追加'}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
