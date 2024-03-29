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

class StorageService<T extends StringMap> {
  storage: FirebaseStorage
  getUploadPath: (props: UploadPathProps<T>) => string

  constructor({ storage, getPath }: StorageServiceProps<T>) {
    this.storage = storage
    this.getUploadPath = (props) => {
      const path = getPath(props)
      const ext = props.file.name.split('.').pop()
      const uuid = crypto.randomUUID()
      return `${path}/${uuid}.${ext}`
    }
  }

  async upload(props: UploadPathProps<T>): Promise<string> {
    const path = this.getUploadPath(props)
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
