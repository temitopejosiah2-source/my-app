import { WagmiProvider, useAccount, type Config } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter } from '../config'
import Interactions from '../components/Interactions'

const queryClient = new QueryClient()

function Inner() {
  const { isConnected } = useAccount()
  return (
    <div>
      <appkit-button />
      {isConnected && <Interactions />}
    </div>
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
