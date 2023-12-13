import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type AuthUser = {
  id: string
  name: string
  email: string
}

type LoggedIn = {
  loading: false
  user: AuthUser
}

type LoggedOut = {
  loading: false
  user: null
}

type Loading = {
  loading: true
  user: null
}

export type AuthState = LoggedIn | LoggedOut | Loading

type Login = {
  email: string
  password: string
}

type SignUp = {
  name: string
  email: string
  password: string
}

export type UseAuthReturn = {
  state: AuthState
  login: (login: Login) => Promise<boolean>
  signUp: (signUp: SignUp) => Promise<boolean>
  logout: () => Promise<void>
}

const Config = {
  path: {
    login: '/login',
    signUp: '/signUp',
    logout: '/logout',
  },
} as const

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({ loading: true, user: null })
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/@me`
      const res = await fetch(url, { credentials: 'include', mode: 'cors' })
      if (res.ok) {
        const user = (await res.json()) as AuthUser
        setState({ loading: false, user })
      } else {
        setState({ loading: false, user: null })
        router.push(Config.path.login)
      }
    }
    fetchUser()
  }, [])

  const login = useCallback(
    async (login: Login) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/login`
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(login),
        credentials: 'include',
        mode: 'cors',
      })
      if (res.ok) {
        const user = (await res.json()) as AuthUser
        setState({ loading: false, user })
        return true
      } else {
        setState((state) => ({ ...state, loading: false }))
        return false
      }
    },
    [setState],
  )

  const logout = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/logout`
    const res = await fetch(url, { credentials: 'include', mode: 'cors' })
    if (res.ok) {
      setState({ loading: false, user: null })
      router.push(Config.path.login)
    } else {
      setState((state) => ({ ...state, loading: false }))
    }
  }, [setState])

  const signUp = useCallback(
    async (signUp: SignUp) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users`
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(signUp),
      })
      if (res.ok) {
        const user = (await res.json()) as AuthUser
        setState({ loading: false, user })
        return true
      } else {
        setState((state) => ({ ...state, loading: false }))
        return false
      }
    },
    [setState],
  )

  return { state, login, logout, signUp }
}
