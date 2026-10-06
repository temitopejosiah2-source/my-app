import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia } from '@reown/appkit/networks'

const projectId = import.meta.env.VITE_PROJECT_ID as string

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [sepolia],
})

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [sepolia],
  defaultNetwork: sepolia,
  metadata: {
    name: 'My App',
    description: 'Wallet demo',
    url: 'http://localhost:5173',
    icons: [],
  },
})
