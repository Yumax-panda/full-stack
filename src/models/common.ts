type From = {
  from: Date
  to?: Date
}

type To = {
  from?: Date
  to: Date
}

type Span = From | To

export type Spanned<T> = T & Span
// Branded types
export type Id<K, T> = K & { __id: T }
