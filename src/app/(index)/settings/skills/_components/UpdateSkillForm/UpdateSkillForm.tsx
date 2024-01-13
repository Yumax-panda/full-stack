import { getLevelHelperText, skills } from '@/constants/skills'
import { Check, Close } from '@mui/icons-material'
import {
  Autocomplete, Box, Chip, IconButton, Input, InputLabel, MenuItem, Select, Slider, TextField,
  Tooltip
} from '@mui/material'

import { updateSkillAction } from './action'

import type { SkillWithTags, Tag } from '@/models'

type Props = SkillWithTags & {
  tags: Pick<Tag, 'id' | 'name'>[]
  onClose: () => void
}

export const UpdateSkillForm = ({ id, name, level, tags, onClose }: Props) => {
  const action = updateSkillAction.bind(null, id)
  const tagColorMap = new Map(tags.map((tag) => [tag.id, tag.color]))

  return (
    <form
      action={action}
      style={{
        display: 'flex',
        width: '100%',
        padding: '1rem',
        alignItems: 'center',
      }}
    >
      <Autocomplete
        options={skills.map((skill) => skill.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='スキル名'
            name='name'
            variant='standard'
          />
        )}
        defaultValue={skills.find((skill) => skill.name === name)?.name}
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
          name='level'
          defaultValue={level}
          min={0}
          max={3}
          step={1}
          sx={{ my: 'auto' }}
          valueLabelFormat={getLevelHelperText}
          valueLabelDisplay='auto'
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
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={tags.find((tag) => tag.id === value)?.name}
                  sx={{ mr: 0.5, bgcolor: tagColorMap.get(value) }}
                />
              ))}
            </Box>
          )}
          input={<Input fullWidth />}
          required
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
        <Tooltip title='保存'>
          <IconButton type='submit'>
            <Check />
          </IconButton>
        </Tooltip>

        <Tooltip title='閉じる'>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Tooltip>
      </Box>
    </form>
  )
}
