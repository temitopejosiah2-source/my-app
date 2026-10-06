import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyWagmiConfig } from '../privyConfig'
import Interactions from '../components/Interactions'

const queryClient = new QueryClient()

function Inner() {
  const { ready, authenticated, login, logout } = usePrivy()
  if (!ready) return <p className="muted">Loading Privy...</p>
  return (
    <>
      <section className="card connect-card">
        <div>
          <h2 className="card-title">Wallet</h2>
          <p className="muted">{authenticated ? 'Connected with Privy' : 'Connect to get started'}</p>
        </div>
        {authenticated ? (
          <button className="btn btn-secondary" onClick={logout}>Log out</button>
        ) : (
          <button className="btn btn-primary" onClick={login}>Connect with Privy</button>
        )}
      </section>
      {authenticated && <Interactions />}
    </>
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
