import { useState } from 'react'
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useSendTransaction,
  useSignMessage,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { isAddress, parseEther } from 'viem'

export default function Interactions() {
  const { address, chain } = useAccount()
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('0.001')

  // READ
  const { data: balance } = useBalance({ address })
  const { data: block } = useBlockNumber({ watch: true })

  // WRITE: send ETH
  const { sendTransaction, data: hash, isPending, error } = useSendTransaction()
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // WRITE: sign a message
  const { signMessage, data: signature } = useSignMessage()

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Read</h3>
      <p>Address: {address}</p>
      <p>Network: {chain?.name}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
      <p>Latest block: {block?.toString()}</p>

      <h3>Write</h3>
      <input placeholder="Recipient 0x..." value={to} onChange={(e) => setTo(e.target.value)} />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button
        disabled={!isAddress(to) || isPending}
        onClick={() => sendTransaction({ to: to as `0x${string}`, value: parseEther(amount) })}
      >
        {isPending ? 'Confirm in wallet...' : 'Send ETH'}
      </button>
      {confirming && <p>Confirming...</p>}
      {isSuccess && <p>Sent: {hash}</p>}
      {error && <p style={{ color: 'crimson' }}>{error.message.slice(0, 120)}</p>}

      <br />
      <button onClick={() => signMessage({ message: 'Hello from my-app' })}>Sign message</button>
      {signature && <p style={{ wordBreak: 'break-all' }}>Signature: {signature}</p>}
    </div>
  )
}
