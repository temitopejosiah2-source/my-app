import './App.css'
import { useState } from 'react'
import PrivySection from './sections/PrivySection'
import AppKitSection from './sections/AppKitSection'

export default function App() {
  const [tab, setTab] = useState<'privy' | 'appkit'>('appkit')
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">my-app</h1>
        <p className="subtitle">Connect a wallet, read onchain data and send transactions.</p>
      </header>

      <div className="tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'appkit'}
          className={`tab ${tab === 'appkit' ? 'active' : ''}`}
          onClick={() => setTab('appkit')}
        >
          AppKit
        </button>
        <button
          role="tab"
          aria-selected={tab === 'privy'}
          className={`tab ${tab === 'privy' ? 'active' : ''}`}
          onClick={() => setTab('privy')}
        >
          Privy
        </button>
      </div>

      <main className="stack">
        {tab === 'appkit' ? <AppKitSection /> : <PrivySection />}
      </main>
    </div>
  )
}
