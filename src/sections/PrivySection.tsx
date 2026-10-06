import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyWagmiConfig } from '../privyConfig'
import Interactions from '../components/Interactions'

const queryClient = new QueryClient()

function Inner() {
  const { ready, authenticated, login, logout } = usePrivy()
  if (!ready) return <p>Loading Privy...</p>
  return (
    <div>
      {authenticated ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <button onClick={login}>Connect with Privy</button>
      )}
      {authenticated && <Interactions />}
    </div>
  )
}

export default function PrivySection() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{ loginMethods: ['wallet', 'email'] }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={privyWagmiConfig}>
          <Inner />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
