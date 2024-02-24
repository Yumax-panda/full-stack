import { ImageResponse } from 'next/og'
import { colorTheme } from '@/constants/colorTheme'

type Props = {
  name?: string | null
  image?: string | null
}

export async function generateOgp({
  name,
  image,
}: Props): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundImage: colorTheme.special,
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 320,
              border: '2px solid lightgray',
            }}
          >
            <img
              src={image ?? undefined}
              style={{
                width: 300,
                height: 300,
                borderRadius: 200,
                margin: 20,
              }}
            />
          </div>
          <h1
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'rgb(99, 102, 241, 0.5)',
            }}
          >
            {name ?? '名前未設定'}
          </h1>
        </div>
      </div>
    ),
    {
      width: 500,
      height: 500,
    },
  )
}
