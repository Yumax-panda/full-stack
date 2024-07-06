import { ImageResponse } from 'next/og'

import { colorTheme } from '@/constants/colorTheme'

export const runtime = 'edge'
export const size = {
  width: 500,
  height: 500,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundImage: colorTheme.default,
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f4f4f4',
          width: '100%',
          height: '100%',
          borderRadius: 20,
          border: '5px solid lightgray',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h1
          style={{
            fontWeight: 'bold',
            fontSize: 60,
          }}
        >
          Full Stack
        </h1>
      </div>
    </div>,
    size,
  )
}
