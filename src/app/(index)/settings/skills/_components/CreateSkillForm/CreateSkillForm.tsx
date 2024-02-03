import { getLevelHelperText, skills } from '@/constants/skills'
import { Check, Close } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Tooltip,
} from '@mui/material'

import { createSkillAction } from './action'
import type { Tag as TagType } from '@prisma/client'

import { Tag } from '@/app/(index)/_components/Tag'

type Props = {
  allTags: TagType[]
  onClose: () => void
  userId: string
}

export const CreateSkillForm = ({ onClose, allTags, userId }: Props) => {
  const tagMap = new Map(allTags.map((tag) => [tag.id, tag]))
  const action = createSkillAction.bind(null, userId)

  return (
    <form
      action={action}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: '1rem',
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
          name='level'
          defaultValue={0}
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
          defaultValue={[]}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {(selected as string[]).map((value) => {
                const tag = tagMap.get(value)
                return tag ? <Tag key={tag.id} {...tag} /> : null
              })}
            </Box>
          )}
          input={<Input fullWidth />}
          sx={{ flexGrow: 2 }}
        >
          {allTags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box>
        <Tooltip title='キャンセル' arrow>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Tooltip>
        <Tooltip title='保存' arrow>
          <IconButton type='submit'>
            <Check />
          </IconButton>
        </Tooltip>
      </Box>
    </form>
  )
}
