import { Check, Close } from '@mui/icons-material'
import {
  Button, IconButton, MenuItem, OutlinedInput, Select, Slider, TextField, Tooltip
} from '@mui/material'

import { updateSkillAction } from './action'

import type { SkillWithTags, Tag } from '@/models'

type Props = SkillWithTags & { tags: Pick<Tag, 'id' | 'name'>[], onClose: () => void }

export const UpdateSkillForm = ({ id, name, level, tags, onClose }: Props) => {
  const action = updateSkillAction.bind(null, id)

  return (
    <form action={action}>
      <TextField
        name='name'
        defaultValue={name}
        variant='outlined'
        margin='normal'
        required
      />
      <Slider
        name='level'
        defaultValue={level}
        min={0}
        max={3}
        step={1}
        marks
        valueLabelDisplay='auto'
      />
      <Select
        name='tagIds'
        labelId='tagIds'
        multiple
        defaultValue={tags.map((tag) => tag.id)}
        input={<OutlinedInput label='タグ' />}
        required
      >
        {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
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
    </form>
  )
}
