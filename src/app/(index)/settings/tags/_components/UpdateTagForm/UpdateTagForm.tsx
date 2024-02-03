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
    handleDelete,
  } = useUpdateTagForm({ ...tag, onCanceled: onClose })

  return (
    <Box sx={{ py: '0.25rem', borderRadius: '4px' }}>
      <TagForm
        onClose={onClose}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
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
