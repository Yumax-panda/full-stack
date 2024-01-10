import type { Control, FormState } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { updateWorkSchema as formSchema } from '@/models'
import { workImageStorage } from '@/repository/storage'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Work as Props } from '@prisma/client'

import type { UpdateWork as FormValues } from '@/models'
type UseEditReturn = {
  control: Control<FormValues>
  onSubmit: () => void
  formState: FormState<FormValues>
  thumbnail: string | null
  onThumbnailUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onThumbnailRemove: () => void
  isPrivate: boolean
  toggleIsPrivate: () => void
}

export const useEdit = ({
  title,
  content,
  thumbnail: initialThumbnail,
  ...rest
}: Props): UseEditReturn => {
  const { control, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      mode: 'onChange',
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: title ?? '',
        content: content ?? '',
        thumbnail: initialThumbnail ?? '',
        ...rest,
      },
    })

  const onThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await workImageStorage.upload({
      userId: rest.userId,
      workId: rest.id,
      file,
    })

    setValue('thumbnail', url)
  }

  const thumbnail = watch('thumbnail')

  const onThumbnailRemove = async () => {
    if (!thumbnail) return

    await workImageStorage.delete(thumbnail)
    setValue('thumbnail', null)
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const isPrivate = watch('isPrivate')

  const toggleIsPrivate = () => {
    setValue('isPrivate', !isPrivate)
  }

  return {
    control,
    onSubmit,
    formState,
    thumbnail,
    onThumbnailUpload,
    onThumbnailRemove,
    isPrivate,
    toggleIsPrivate,
  }
}
