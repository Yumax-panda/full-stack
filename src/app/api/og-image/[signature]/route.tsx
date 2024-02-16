import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
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
          backgroundColor: '#f4f4f4',
          color: 'black',
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
    ),
    {
      width: 500,
      height: 500,
    },
  )
}
