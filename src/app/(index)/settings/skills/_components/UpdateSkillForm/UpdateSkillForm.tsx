import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material'

import { updateSkillAction } from './action'

import type { SkillWithTags, Tag } from '@/models'

type Props = SkillWithTags & { tags: Pick<Tag, 'id' | 'name'>[] }

export const UpdateSkillForm = ({ id, name, level, image, tags }: Props) => {
  const action = updateSkillAction.bind(null, id)

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        name='name'
        label='スキル名'
        defaultValue={name}
        variant='outlined'
        fullWidth
        margin='normal'
        required
      />
      <TextField
        name='level'
        label='レベル'
        defaultValue={level}
        variant='outlined'
        fullWidth
        required
      />
      <InputLabel id='tagIds'>タグ</InputLabel>
      <Select
        name='tagIds'
        labelId='tagIds'
        multiple
        defaultValue={tags.map((tag) => tag.id)}
        input={<OutlinedInput label='タグ' />}
        fullWidth
        required
      >
        {tags.map((tag) => (
          <MenuItem key={tag.id} value={tag.id}>
            {tag.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        name='image'
        label='画像'
        defaultValue={image}
        variant='outlined'
        fullWidth
        margin='normal'
        required
      />
      <Button type='submit' variant='contained' color='primary'>
        更新する
      </Button>
    </form>
  )
}
