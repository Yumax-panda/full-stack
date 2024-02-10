'use client'

import { ThemeProvider as Provider, createTheme } from '@mui/material'
import '@fontsource/noto-sans-jp'
import '@fontsource/noto-sans-jp/500.css'
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider theme={theme}>{children}</Provider>
)
