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

const short = (v?: string) => (v ? `${v.slice(0, 6)}...${v.slice(-4)}` : '-')

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

  const validAmount = Number(amount) > 0
  const canSend = isAddress(to) && validAmount && !isPending
  const explorer = chain?.blockExplorers?.default.url

  return (
    <>
      <section className="card">
        <h2 className="card-title">Read</h2>
        <div className="row"><span>Address</span><span title={address}>{short(address)}</span></div>
        <div className="row"><span>Network</span><span>{chain?.name ?? '-'}</span></div>
        <div className="row">
          <span>Balance</span>
          <span>{balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : '-'}</span>
        </div>
        <div className="row"><span>Latest block</span><span>{block?.toString() ?? '-'}</span></div>
      </section>

      <section className="card">
        <h2 className="card-title">Send ETH</h2>
        <input
          placeholder="Recipient 0x..."
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="btn btn-primary"
          disabled={!canSend}
          onClick={() => sendTransaction({ to: to as `0x${string}`, value: parseEther(amount) })}
        >
          {isPending ? 'Confirm in wallet...' : 'Send ETH'}
        </button>
        {confirming && <p className="notice">Confirming transaction...</p>}
        {isSuccess && hash && (
          <p className="notice ok">
            Sent:{' '}
            {explorer ? (
              <a href={`${explorer}/tx/${hash}`} target="_blank" rel="noreferrer">{short(hash)}</a>
            ) : (
              short(hash)
            )}
          </p>
        )}
        {error && <p className="notice error">{error.message.slice(0, 120)}</p>}
      </section>

      <section className="card">
        <h2 className="card-title">Sign message</h2>
        <button
          className="btn btn-secondary"
          onClick={() => signMessage({ message: 'Hello from my-app' })}
        >
          Sign "Hello from my-app"
        </button>
        {signature && <p className="notice mono">{signature}</p>}
      </section>
    </>
  )
}
