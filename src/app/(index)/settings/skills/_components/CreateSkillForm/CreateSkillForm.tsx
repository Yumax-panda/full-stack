import { getLevelHelperText, skills } from '@/constants/skills'
import { Check, Close } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material'

import { createSkillAction } from './action'

import type { Tag } from '@/models'

type Props = {
  allTags: Tag[]
  onClose: () => void
  userId: string
}

export const CreateSkillForm = ({ onClose, allTags, userId }: Props) => {
  const tagColorMap = new Map(allTags.map((tag) => [tag.id, tag.color]))
  const tagIdNameMap = new Map(allTags.map((tag) => [tag.id, tag.name]))
  const action = createSkillAction.bind(null, userId)

  return (
    <form
      action={action}
      onSubmit={onClose}
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
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={tagIdNameMap.get(value)}
                  sx={{ mr: 0.5, bgcolor: tagColorMap.get(value) }}
                />
              ))}
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
