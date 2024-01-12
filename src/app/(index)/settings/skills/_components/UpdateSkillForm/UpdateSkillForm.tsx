import { skills } from '@/constants/skills'
import { Check, Close } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField,
  Tooltip,
} from '@mui/material'

import { updateSkillAction } from './action'

import type { SkillWithTags, Tag } from '@/models'

type Props = SkillWithTags & {
  tags: Pick<Tag, 'id' | 'name'>[]
  onClose: () => void
}

export const UpdateSkillForm = ({ id, name, level, tags, onClose }: Props) => {
  const action = updateSkillAction.bind(null, id)

  return (
    <form
      action={action}
      style={{ display: 'flex', width: '100%', padding: '1rem' }}
    >
      <Autocomplete
        options={skills.map((skill) => skill.name)}
        renderInput={(params) => (
          <TextField {...params} label='スキル名' name='name' />
        )}
        defaultValue={skills.find((skill) => skill.name === name)?.name}
        sx={{ flexGrow: 3, mr: '1rem' }}
      />
      <Slider
        name='level'
        defaultValue={level}
        min={0}
        max={3}
        step={1}
        marks
        valueLabelDisplay='auto'
        sx={{ width: '20%' }}
      />
      <Select
        name='tagIds'
        labelId='tagIds'
        multiple
        defaultValue={tags.map((tag) => tag.id)}
        input={<OutlinedInput label='タグ' />}
        required
        sx={{ flexGrow: 2 }}
      >
        {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
