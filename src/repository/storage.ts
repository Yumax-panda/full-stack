import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

import type { FirebaseStorage } from 'firebase/storage'
import { storage } from '@/lib/firebase'

type StringMap = Record<string, string>

type StorageServiceProps<T extends StringMap> = {
  storage: FirebaseStorage
  getPath: (props: PathProps<T>) => string
}

type FileProps = {
  file: File
}

type PathProps<T extends StringMap> = {
  userId: string
} & T

type UploadPathProps<T extends StringMap> = PathProps<T> & FileProps

const getHashedMessage = async (message: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashedBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashedArray = Array.from(new Uint8Array(hashedBuffer))
  return hashedArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

const getHashedFilename = async (file: File): Promise<string> => {
  const filename = file.name
  const ext = filename.split('.').pop() ?? ''
  const hashedMessage = await getHashedMessage(filename)
  return `${hashedMessage}.${ext}`
}

class StorageService<T extends StringMap> {
  storage: FirebaseStorage
  getUploadPath: (props: UploadPathProps<T>) => Promise<string>

  constructor({ storage, getPath }: StorageServiceProps<T>) {
    this.storage = storage
    this.getUploadPath = async (props) => {
      const hashedFilename = await getHashedFilename(props.file)
      return `${getPath(props)}/${hashedFilename}`
    }
  }

  async upload(props: UploadPathProps<T>): Promise<string> {
    const path = await this.getUploadPath(props)
    const storageRef = ref(this.storage, path)
    await uploadBytes(storageRef, props.file)
    return await getDownloadURL(storageRef)
  }

  async delete(downloadUrl: string): Promise<void> {
    const storageRef = ref(this.storage, downloadUrl)
    await deleteObject(storageRef)
  }
}

type WorkImageProps = {
  workId: string
}

export const workImageStorage = new StorageService<WorkImageProps>({
  storage,
  getPath: ({ userId, workId }) => `users/${userId}/work-images/${workId}`,
})
