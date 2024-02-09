import { Box } from '@mui/material'
import { useUpdateTagForm } from '../hooks/useUpdateTagForm'
import { TagForm } from '../TagForm'
import type { Tag } from '@prisma/client'

type Props = {
  onClose: () => void
  tag: Tag
}

export const UpdateTagForm = ({ onClose, tag }: Props) => {
  const {
    register,
    formState,
    setValue,
    handleSubmit,
    isLoading,
    current,
    regenerateColor,
  } = useUpdateTagForm({ ...tag, onCanceled: onClose })

  return (
    <Box sx={{ borderTop: '0.5px solid lightgray' }}>
      <TagForm
        onClose={onClose}
        onSubmit={handleSubmit}
        tagId={tag.id}
        register={register}
        formState={formState}
        setValue={setValue}
        isLoading={isLoading}
        current={current}
        regenerateColor={regenerateColor}
      />
    </Box>
  )
}
