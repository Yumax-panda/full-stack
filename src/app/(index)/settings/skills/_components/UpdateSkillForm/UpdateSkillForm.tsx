import {
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'

import { updateSkillAction } from './action'

import type { SkillWithTags, Tag } from '@/models'

type Props = SkillWithTags & { tags: Pick<Tag, 'id' | 'name'>[] }

export const UpdateSkillForm = ({ id, name, level, tags }: Props) => {
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
      <TextField
        name='level'
        defaultValue={level}
        variant='outlined'
        required
        type='number'
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
      <Button type='submit' variant='contained' color='primary'>
        更新する
      </Button>
    </form>
  )
}
