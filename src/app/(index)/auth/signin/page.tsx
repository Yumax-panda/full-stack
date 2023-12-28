import { getProviders } from 'next-auth/react'

import { SigninButton } from '../_components/SigninButton'

export default async function Page() {
  const providers = await getProviders()
  return (
    <>
      <h1>Sign in</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <SigninButton key={provider.id} id={provider.id} />
        ))}
    </>
  )
}
