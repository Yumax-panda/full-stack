import { Autocomplete, TextField } from '@mui/material'

import type { Tag as PrismaTagModel } from '@prisma/client'

import { Tag } from '@/app/(index)/_components/Tag'

type TagType = Pick<PrismaTagModel, 'id' | 'name' | 'color' | 'brief'>

type Props = {
  setSelectedTags: (tags: TagType[]) => void
  options: TagType[]
  selectedTags: TagType[]
}

/**
 * スキルのタグを絞り込むためのセレクトボックス
 * ref: https://mui.com/material-ui/react-autocomplete/
 */
export const SkillTagFilterSelect = ({
  setSelectedTags,
  options,
  selectedTags,
}: Props) => {
  return (
    <Autocomplete
      multiple
      id='skill-tag-filter-select'
      value={selectedTags}
      onChange={(_, newValue) => {
        setSelectedTags(newValue)
      }}
      options={options}
      getOptionLabel={(option) => option.name}
      renderTags={(value, getTagProps) =>
        value.map((tag, index) => (
          <div key={tag.id} style={{ marginRight: '6px' }}>
            <Tag {...getTagProps({ index })} {...tag} />
          </div>
        ))
      }
      renderInput={(params) => <TextField {...params} label='絞り込む' />}
      sx={{ mb: 2 }}
    />
  )
}
