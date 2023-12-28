import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

import { storage } from '@/lib/firebase'

import type { FirebaseStorage } from 'firebase/storage'

type StorageServiceProps<T extends Record<string, string>> = {
  storage: FirebaseStorage
  getPath: (props: T) => string
}

type FileProps = {
  file: File
}

class StorageService<T extends Record<string, string>> {
  storage: FirebaseStorage
  getPath: (props: T) => string

  constructor({ storage, getPath }: StorageServiceProps<T>) {
    this.storage = storage
    this.getPath = getPath
  }

  private getRef(props: T) {
    return ref(this.storage, this.getPath(props))
  }

  async upload(props: T & FileProps): Promise<void> {
    const ref = this.getRef(props)
    await uploadBytes(ref, props.file)
  }

  async delete(props: T): Promise<void> {
    const ref = this.getRef(props)
    await deleteObject(ref)
  }

  async getDownloadURL(props: T): Promise<string> {
    const ref = this.getRef(props)
    return getDownloadURL(ref)
  }
}

type WorkImageProps = {
  userId: string
  filename: string
}

export const workImageStorage = new StorageService<WorkImageProps>({
  storage,
  getPath: ({ userId, filename }) => `users/${userId}/work-images/${filename}`,
})
