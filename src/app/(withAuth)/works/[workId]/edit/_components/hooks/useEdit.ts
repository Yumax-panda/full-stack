import type { Control, FormState, FieldErrors } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { updateWorkSchema as formSchema } from '@/models'
import { workImageStorage } from '@/repository/storage'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Work as Props } from '@prisma/client'

import type { UpdateWork as FormValues, UpdateWork } from '@/models'
type UseEditReturn = {
  control: Control<FormValues>
  onSubmit: () => void
  isLoading: boolean
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
  thumbnail: _initialThumbnail,
  ...rest
}: Props): UseEditReturn => {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  // 初期値はnullにしておく初期のサムネイル画像がある場合はそれをセットする
  const [initialThumbnail, setInitialThumbnail] = useState<string | null>(
    _initialThumbnail,
  )
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      mode: 'onChange',
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: title ?? '',
        content: content ?? '',
        thumbnail: '',
        ...rest,
      },
    })

  const { task } = useToastPromise({
    pending: '更新中',
    success: '更新しました',
    action: async (data: FormValues) => submitHandler(data),
    setIsLoading,
  })

  useEffect(() => {
    if (initialThumbnail) {
      setValue('thumbnail', initialThumbnail ?? '')
    }
  }, [initialThumbnail, setValue])

  const onThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setThumbnailFile(file)
    const url = URL.createObjectURL(file)

    setValue('thumbnail', url)
  }

  const thumbnail = watch('thumbnail')

  const onThumbnailRemove = async () => {
    if (!thumbnail) return

    setThumbnailFile(null)
    setValue('thumbnail', null)
  }

  const uploadThumbnail = async (file: File) => {
    return await workImageStorage.upload({
      file,
      userId: rest.userId,
      workId: rest.id,
    })
  }

  const submitHandler = async (data: FormValues) => {
    const { id, thumbnail } = data

    // データを値渡しでコピー
    const updatePayload: UpdateWork = { ...data }

    // 画像に変更がある場合
    // 1. 画像を削除した場合
    if (initialThumbnail && !thumbnail) {
      await workImageStorage.delete(initialThumbnail)
      updatePayload.thumbnail = null
      setInitialThumbnail(null)
    }
    // 2. 画像を変更した場合 (既存の画像を削除して新しい画像をアップロードする)
    else if (thumbnailFile) {
      const tasks: Promise<void>[] = [
        (async () => {
          const url = await uploadThumbnail(thumbnailFile)
          updatePayload.thumbnail = url
          setInitialThumbnail(url)
        })(),
      ]
      if (initialThumbnail) {
        tasks.push(workImageStorage.delete(initialThumbnail))
      }
      await Promise.all(tasks)
    }

    const res = await fetch(`/api/works/${id}`, {
      cache: 'no-cache',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    })

    if (!res.ok) {
      const { error } = await res.json()
      throw new Error(error)
    }
  }

  const getErrorMessage = (e: FieldErrors<FormValues>) => {
    if (e.title?.type === 'required') {
      return 'タイトルは必須です。'
    }
    if (e.content?.type === 'required') {
      return '本文は必須です。'
    }
    const messages = Object.values(e).map((v) => v?.message)
    return messages.join('\n')
  }

  const onSubmit = handleSubmit(task, (invalid) =>
    toast.error(getErrorMessage(invalid)),
  )

  const isPrivate = watch('isPrivate')

  const toggleIsPrivate = () => {
    setValue('isPrivate', !isPrivate)
  }

  return {
    control,
    onSubmit,
    isLoading,
    formState,
    thumbnail,
    onThumbnailUpload,
    onThumbnailRemove,
    isPrivate,
    toggleIsPrivate,
  }
}
