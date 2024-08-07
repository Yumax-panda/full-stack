import { Box } from '@mui/material'

import { TagForm } from '../TagForm'
import { useCreateTagForm } from '../hooks/useCreateTagForm'

type Props = {
  onClose: () => void
}

// NOTE: zodResolverでバリデーションをするため、ここでは不要
export const CreateTagForm = ({ onClose }: Props) => {
  const {
    register,
    formState,
    setValue,
    handleSubmit,
    isLoading,
    current,
    regenerateColor,
  } = useCreateTagForm({ onCanceled: onClose })

  return (
    <Box sx={{ bgcolor: 'grey.200', py: '0.25rem', borderRadius: '4px' }}>
      <TagForm
        onClose={onClose}
        onSubmit={handleSubmit}
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
