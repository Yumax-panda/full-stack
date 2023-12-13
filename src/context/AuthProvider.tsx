'use client'

import React, { createContext } from 'react'
import { useAuth, type AuthState } from '@/hooks/useAuth'

const AuthContext = createContext<AuthState>({ loading: true, user: null })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuth()

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
