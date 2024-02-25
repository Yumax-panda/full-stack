import { ImageResponse } from 'next/og'
import { NextRequest, NextResponse } from 'next/server'

import { colorTheme } from '@/constants/colorTheme'
import { verify } from '@/lib/signature'
import { userParser } from '@/parser'

export async function GET(
  req: NextRequest,
  {
    params: { signature },
  }: {
    params: { signature: string }
  },
) {
  if (!signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  const searchParams = new URLSearchParams(req.nextUrl.searchParams)
  const user = userParser.fromSearchParams(searchParams)
  if (!user) {
    return NextResponse.json({ error: 'Invalid user' }, { status: 400 })
  }
  const query = userParser.toString(user)
  const isValid = await verify(query, signature)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
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
              src={user.image ?? undefined}
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
            {user.name ?? '名前未設定'}
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
