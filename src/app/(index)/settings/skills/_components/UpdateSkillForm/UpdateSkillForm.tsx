import { getLevelHelperText, skills } from '@/constants/skills'
import { Check, Close } from '@mui/icons-material'
import type { Tag as TagType } from '@prisma/client'
import {
  Autocomplete,
  Box,
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

import { Tag } from '@/app/(index)/_components/Tag'
import { DeleteSkillButton } from '../DeleteSkillButton'
import { deleteSkillAction } from '../DeleteSkillButton/action'
import { updateSkillAction } from './action'

import type { SkillWithTags } from '@/models'

type Props = SkillWithTags & {
  allTags: TagType[]
  onClose: () => void
  userId: string
}

export const UpdateSkillForm = ({
  id,
  name,
  level,
  tags,
  onClose,
  allTags,
  userId,
}: Props) => {
  const action = updateSkillAction.bind(null, id, userId)
  const deleteAction = deleteSkillAction.bind(null, id)
  const tagMap = new Map(allTags.map((tag) => [tag.id, tag]))

  return (
    <Stack
      sx={{
        display: 'flex',
        width: '100%',
        padding: '1rem',
      }}
    >
      <form
        action={deleteAction}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <DeleteSkillButton />
      </form>
      <form
        action={action}
        style={{
          display: 'flex',
          width: '100%',
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
              required
            />
          )}
          freeSolo
          defaultValue={name}
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
            {allTags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Tooltip title='閉じる' arrow>
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
    </Stack>
  )
}
