import './App.css'
import { useState } from 'react'
import PrivySection from './sections/PrivySection'
import AppKitSection from './sections/AppKitSection'

export default function App() {
  const [tab, setTab] = useState<'privy' | 'appkit'>('appkit')
  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => setTab('appkit')}>AppKit</button>
      <button onClick={() => setTab('privy')}>Privy</button>
      <hr />
      {tab === 'appkit' ? <AppKitSection /> : <PrivySection />}
    </div>
  )
}
