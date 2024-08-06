import { ImageResponse } from 'next/og'
import { factory } from './utils'

import { colorTheme } from '@/constants/colorTheme'
import { INVALID_SIGNATURE } from '@/lib/error'
import { verify } from '@/lib/signature'
import { userParser } from '@/parser'

export const ogp = factory
  .createApp()
  // GET /api/v1/ogp/:signature
  // Query: name, image
  .get('/:signature', async (c) => {
    const signature = c.req.param('signature')
    const { name, image } = c.req.query()
    const user = { name, image }

    const query = userParser.toString(user)
    const isValid = await verify(query, signature)
    if (!isValid) {
      return c.json({ error: INVALID_SIGNATURE }, { status: 400 })
    }

    return new ImageResponse(
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
            {/* eslint-disable-next-line */}
            <img
              src={user.image ?? undefined}
              alt='user profile icon'
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
      </div>,
      {
        width: 500,
        height: 500,
      },
    )
  })
