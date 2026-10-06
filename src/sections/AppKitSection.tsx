import { WagmiProvider, useAccount, type Config } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter } from '../config'
import Interactions from '../components/Interactions'

const queryClient = new QueryClient()

function Inner() {
  const { isConnected } = useAccount()
  return (
    <>
      <section className="card connect-card">
        <div>
          <h2 className="card-title">Wallet</h2>
          <p className="muted">{isConnected ? 'Connected with AppKit' : 'Connect to get started'}</p>
        </div>
        <appkit-button />
      </section>
      {isConnected && <Interactions />}
    </>
  )
}

export default function AppKitSection() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>
        <Inner />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
